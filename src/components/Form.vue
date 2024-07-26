<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { labelObject, placeHolderObject } from './inputs/data_input/dataInput';
import api from '../api';
import InputText from './inputs/InputText.vue';
import InputTextarea from './inputs/InputTextarea.vue';
import InputEmail from './inputs/InputEmail.vue';
import InputNumber from './inputs/InputNumber.vue';

const forms = ref(null);
const inputType = ref({});
const route = useRoute();
const uid = route.params.id;
const apiID = ref(null)

const componentMap = {
    'input-textarea': InputTextarea,
    'input-email': InputEmail,
    'input-text': InputText,
    'input-number': InputNumber
};

async function fetchForm() {
    try {
        const response = await api.get(`/content-type-builder/content-types/${uid}`);
        if (!response.data.data) {
            console.error('Form not found:', response.data);
            return;
        }
        forms.value = response.data.data;

        // Initialize formData with empty strings for each component
        forms.value.schema.attributes.input.components.forEach(component => {
            inputType.value[component] = '';
            console.log(inputType);
        });

        apiID.value = response.data.data.apiID
        console.log(apiID.value);

        console.log(forms.value);
    } catch (error) {
        console.error('Error fetching form:', error);
    }
}

fetchForm();

const getComponentType = (component) => {
    // Cherchez la clé dans l'objet de mappage qui est incluse dans le nom du composant
    for (const key in componentMap) {
        if (component.includes(key)) {
            return componentMap[key];
        }
    }
    // Retour par défaut si le type de composant est inconnu
    return 'input';
};

const getLabel = (component) => {
    const componentKey = component.split('.')[1];
    for (const key in labelObject) {
        if (componentKey && componentKey === key) {
            return labelObject[key];
        }
    }
    return '';
};

const getPlaceholder = (component) => {
    const componentKey = component.split('.')[1];
    for (const key in placeHolderObject) {
        if (componentKey && componentKey === key) {
            return placeHolderObject[key];
        }
    }
    return '';
};

async function handleSubmit() {

    const data = forms.value.schema.attributes.input.components.map(component => {
        return {
            "__component": component,
            component: inputType.value // Spread operator to include dynamic fields
        }
    })
    console.log(data);

    try {
        // Collect data in the required format
        console.log(forms.value.schema.attributes.input.components);
        const formData = {
            "data": {
                "input": [
                    {
                        "__component": "input-text.name",
                        "name": "John "
                    },
                    {
                        "__component": "input-text.surname",
                        "surname": "Doe"
                    }
                ]
            }
        }

        const response = await api.post(`${apiID.value}s?populate=*`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Response: ", response);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}

</script>

<template>
    <h1 v-if="forms">
        {{ capitalizeFirstLetter(
            forms.apiID
                .split('-')
                .slice(1)
                .toString())
        }}
    </h1>
    <div class="container-form" v-if="forms">
        <form class="form-public" @submit.prevent="handleSubmit">
            <div class="container-input" v-for="(field, index) in forms.schema.attributes.input.components"
                :key="index">
                <component :is="getComponentType(field)" v-model="inputType[field]" :componentId="field"
                    :label="getLabel(field)" :placeholder="getPlaceholder(field)" />
            </div>
            <input type="submit" value="Envoyer">
        </form>
    </div>
</template>

<style>
.container-form {
    padding: 16px;
    box-sizing: border-box;
    max-width: 800px;
    margin: auto;
}

.form-public {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.container-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.form-public label {
    display: block;
    margin-bottom: 8px;
}

.form-public input,
.form-public textarea,
.form-public select {
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    padding: 12px;
    border-radius: 8px;
}
</style>
