<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const router = useRouter()

const goToFormBuilder = () => {
    router.push('/admin/form-builder')
}

const forms = ref([]);

const fetchForm = async () => {
    try {
        const response = await axios.get('http://localhost:1337/api/forms');
        if (!response.data.data) {
            console.error('Form not found:', response.data);
            return;
        }
        forms.value = response.data.data;
        console.log(forms.value);
    } catch (error) {
        console.error('Error fetching form:', error);
    }
};

onMounted(fetchForm);

console.log('forms', forms.value);
</script>

<template>
    <div class="container-admin">
        <h1>Accueil public</h1>
        <div class="container-news-forms">
            <h2>Sélectionnez un formulaire</h2>

            <div v-if="forms && forms.length > 0" v-for="form in forms" :key="form.id">
                <button @click="router.push(`/form/${form.id}`)">{{ form.attributes.name }}</button>
            </div>
            <div v-else>
                <p>Vous n'avez pas encore de formulaires</p>
            </div>
        </div>
    </div>
</template>

<style>
.container-admin {
    padding: 16px;
}

.form-builder {
    background-color: black;
    color: white;
}

.container-news-forms {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: rgb(233, 233, 233);
    padding: 16px;
    max-width: 800px;
    margin: auto;
    margin-top: 34px;
    border-radius: 12px;
}
</style>
