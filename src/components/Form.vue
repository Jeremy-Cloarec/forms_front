<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import InputText from './inputs/InputText.vue';
import InputTextarea from './inputs/InputTextarea.vue';
import InputEmail from './inputs/InputEmail.vue';

const forms = ref(null);
const formData = ref({});
const route = useRoute();
const uid = route.params.id;

const labelObject = {
    name: 'Votre nom',
    surname: 'Votre prénom',
    email: 'Votre email',
    message: 'Votre message'
}

const placeholderObject = {
    name: 'Entrez votre nom',
    surname: 'Entrez votre prénom',
    email: 'Entrez votre email',
    message: 'Entrez votre message'
}

const componentMap = {
    'input-textarea': InputTextarea,
    'input-email': InputEmail,
    'input-text': InputText
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
            formData.value[component] = '';
        });

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
    console.log('component:', component, 'componentKey:', componentKey);
    for (const key in labelObject) {
        console.log('componentKey:', componentKey, 'key:', key);
        if (componentKey && componentKey === key) {
            return labelObject[key];
        }
    }
    return '';
};

const getPlaceholder = (component) => {
    const componentKey = component.split('.')[1];
    for (const key in placeholderObject) {
        if (componentKey && componentKey === key) {
            return placeholderObject[key];
        }
    }
    return '';
};

const handleSubmit = () => {
    console.log('Form Data:', formData.value);
};

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
                <component :is="getComponentType(field)" v-model="formData[field]" :label="getLabel(field)"
                    :placeholder="getPlaceholder(field)" />
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
