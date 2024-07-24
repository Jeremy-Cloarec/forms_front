<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import InputText from './inputs/InputText.vue';
import InputTextarea from './inputs/InputTextarea.vue';

const forms = ref(null);
const formData = ref({});
const route = useRoute();
const uid = route.params.id;

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

// Function to get the component type based on the name
const getComponentType = (component) => {
    if (component.includes('input-text')) {
        return InputText;
    } else if (component.includes('input-textarea')) {
        return InputTextarea;
    }
    return 'input'; // default to input if type is unknown
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
                .toString()
        ) }}
    </h1>
    <div class="container-form" v-if="forms">
        <form class="form-public" @submit.prevent="handleSubmit">
            <div v-for="(field, index) in forms.schema.attributes.input.components" :key="index">
                <div class="container-input">
                    <component :is="getComponentType(field)" v-model="formData[field]" :placeholder="field" />
                </div>
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
