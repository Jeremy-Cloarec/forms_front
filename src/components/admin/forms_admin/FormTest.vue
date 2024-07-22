<script setup>
import axios from 'axios';
import { ref } from 'vue';

const id = 105;
const forms = ref(null);

async function fetchForm() {
    try {
        const response = await axios.get('http://localhost:1337/api/forms/' + id);
        if (!response.data.data) {
            console.error('Error fetching form: ', response.data);
            return;
        }
        console.log(response.data.data);
        forms.value = response.data.data;
    } catch (error) {
        console.error('Error fetching form:', error);
    }
}

console.log(forms);

fetchForm();
</script>

<template>
    <h1>{{forms.attributes.name}}</h1>
    <div>

        <ul v-if="forms && forms.attributes && forms.attributes.fields" v-for="field in forms.attributes.fields">
            <li v-if="field.inputType ==='TextField'">
                <label for="">
                    {{ field.label }}
                </label>
                <input type="text">
            </li>
            <li v-else-if="field.inputType ==='TextareaField'">
                <label for="">
                    {{ field.label }}
                </label>
                <textarea name="" id=""></textarea>
            </li>
            <li v-else-if="field.inputType ==='SelectField'">
                <label for="">
                    {{ field.label }}
                </label>
                <select name="" id="">
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
            </li>
        </ul>
    </div>
</template>

<style>
li {
    list-style: none;
    margin-bottom: 10px;
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
}
</style>