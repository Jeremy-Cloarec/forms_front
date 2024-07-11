<template>
    <div class="form-container">
        <div class="add-field">
            <button @click="addField('text')">Add Text Field</button>
            <button @click="addField('textarea')">Add Textarea</button>
            <button @click="addField('select')">Add Select</button>
        </div>
        <div class="building-form">
            <form @submit.prevent="handleSubmit">
                <div class="input-container" v-for="(field, index) in fields" :key="index">
                    <component :is="field.component" :field="field" @remove="removeField(index)" />
                </div>
                <button v-if="fields.length > 0" class="submit-form" type="submit">Submit</button>
                <p v-else>No fields added</p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { markRaw } from 'vue';
import TextField from './inputs/TextField.vue';
import TextareaField from './inputs/TextareaField.vue';
import SelectField from './inputs/SelectField.vue';

// Utiliser ref pour la réactivité
const fields = ref([]);

// Ajouter un champ
function addField(type) {
    let component;
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
    fields.value.push({ component });
}

// Supprimer un champ
function removeField(index) {
    fields.value.splice(index, 1);
}

// Gérer la soumission du formulaire
function handleSubmit() {
    console.log(fields.value);
}
</script>

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