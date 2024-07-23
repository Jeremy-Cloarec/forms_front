<script setup>
import { ref } from 'vue';
import { markRaw } from 'vue';
import TextField from '../inputs/TextField.vue';
import TextareaField from '../inputs/TextareaField.vue';
import SelectField from '../inputs/SelectField.vue';
import axios from 'axios';
let formName = ref('');

// Utiliser ref pour la réactivité
const fields = ref([]);

// Ajouter un champ
function addField(type) {
    let component;
    let label = prompt("Enter label for the field:"); // Prompt user for the label
    if (!label) return;
    switch (type) {
        case 'text':
            component = markRaw(TextField);
            break;
        case 'textarea':
            component = markRaw(TextareaField);
            break;
        case 'select':
            component = markRaw(SelectField);
            break;
        default:
            return;
    }
    fields.value.push({ component, label, value: '' });
}

// Supprimer un champ
function removeField(index) {
    fields.value.splice(index, 1);
}

// Fonction pour écrire un fichier sur le serveur Node.js
async function writeToFile(formId) {
    const content = `
    <template>
        <div>
            <h1>${formName.value}</h1>
            <!-- Add your form fields here -->
        </div>
    </template>
    `;

    try {
        const response = await axios.post('http://localhost:4000/write-file', { formId, content, formName: formName.value });
        console.log(response.data);
    } catch (err) {
        console.error('Error writing file:', err);
    }
}

// Gérer la soumission du formulaire
async function handleSubmit() {
    try {
        const response = await axios.post('http://localhost:1337/api/forms', {

            data: {
                name: formName.value,
                fields: fields.value.map(field => {
                    return {
                        inputType: field.component.__name,
                        label: field.label,
                    };
                })
            }
        });
        if (!response.data.data) {
            console.error('Error saving form: ', response.data);
            return;
        }

        const formId = response.data.data.id;
        formName.value = response.data.data.attributes.name;
        console.log('Form saved:', formId, formName);

        console.log(response.data.data.attributes);

    } catch (error) {
        console.error('Error saving form:', error);
    }
}

</script>

<template>
    <div class="form-container">
        <div class="add-field">
            <button @click="addField('text')">Add Text Field</button>
            <button @click="addField('textarea')">Add Textarea</button>
            <button @click="addField('select')">Add Select</button>
        </div>
        <div class="building-form">
            <form @submit.prevent="handleSubmit">
                <div class="form-name">
                    <input type="text" v-model="formName" placeholder="Form Name" />
                </div>
                <div class="input-container" v-for="(field, index) in fields" :key="index">
                    <component :is="field.component" :field="field" @remove="removeField(index)" />
                </div>
                <button v-if="fields.length > 0" class="submit-form" type="submit">Submit</button>
                <p v-else>No fields added</p>
            </form>
        </div>
    </div>
</template>

<style scoped>
.submit-form {
    background: #000;
    color: white;
}

.form-container {
    display: flex;
}

.building-form form {
    max-width: 700px;
    flex: 1;
}

.building-form {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    border: 1px solid rgb(212, 212, 255);
}

.add-field {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background-color: rgb(212, 212, 255);
    gap: 1rem;
}

.building-form form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>