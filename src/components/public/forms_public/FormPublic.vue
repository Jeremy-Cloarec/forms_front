<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const forms = ref(null);
const route = useRoute();
const formId = route.params.id;

async function fetchForm() {
    try {
        const response = await axios.get(`http://localhost:1337/api/forms/${formId}`);
        if (!response.data.data) {
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
    <div class="container-form" v-if="forms && forms.attributes && forms.attributes.fields">
        <form class="form-public" >
            <div v-for="field in forms.attributes.fields" :key="field.id">
                <div class="container-input" v-if="field.inputType === 'TextField'">
                    <label>
                        {{ field.label }}
                    </label>
                    <input type="text">
                </div>
                <div class="container-input" v-else-if="field.inputType === 'TextareaField'">
                    <label>
                        {{ field.label }}
                    </label>
                    <textarea></textarea>
                </div>
                <div class="container-input" v-else-if="field.inputType === 'SelectField'">
                    <label>
                        {{ field.label }}
                    </label>
                    <select>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                    </select>
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