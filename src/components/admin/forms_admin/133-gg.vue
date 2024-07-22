
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const forms = ref(null);

async function fetchForm() {
    try {
        const response = await axios.get('http://localhost:1337/api/forms/133');
        if(!response.data.data) {
            console.error('Form not found:', response.data);
            return;
        }
        console.log(response.data.data);
        forms.value = response.data.data;
    } catch (error) {
        console.error('Error fetching form:', error);
    }
}

fetchForm();
</script>
<template>
    <h1 v-if="forms && forms.attributes && forms.attributes.name">{{ forms.attributes.name }}</h1>
    <div v-if="forms && forms.attributes && forms.attributes.fields">
        <ul v-for="field in forms.attributes.fields" :key="field.id">
            <li v-if="field.inputType === 'TextField'">
                <label>
                    {{ field.label }}
                </label>
                <input type="text">
            </li>
            <li v-else-if="field.inputType === 'TextareaField'">
                <label>
                    {{ field.label }}
                </label>
                <textarea></textarea>
            </li>
            <li v-else-if="field.inputType === 'SelectField'">
                <label>
                    {{ field.label }}
                </label>
                <select>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
            </li>
        </ul>
    </div>
</template>
