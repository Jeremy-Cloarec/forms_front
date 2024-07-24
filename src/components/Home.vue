<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import api from '../api';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

const router = useRouter()

let contentTypes = ref([]);

// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

const fetchContentType = async () => {
    try {
        const response = await api.get('/content-type-builder/content-types');

        if (!response.data.data) {
            console.error('Content type not found:', response.data);
            return;
        }

        // filter content type
        response.data.data = response.data.data.filter(contentType => contentType.uid.includes('api::formulaire-'));
        contentTypes.value = response.data.data;
        console.log(contentTypes.value);

    } catch (error) {
        console.error('Error fetching form:', error);
    }
};

console.log(contentTypes.value);

// onMounted(fetchForm);
onMounted(fetchContentType);

</script>

<template>
    <div class="container-admin">
        <h1>Accueil</h1>
        <div class="container-news-forms">
            <h2>Sélectionnez un formulaire</h2>

            <div v-if="contentTypes" v-for="content in contentTypes" :key="content.uid">
                <button @click="router.push(`/form/${content.uid}`)">
                    {{
                        capitalizeFirstLetter
                            (
                                content.apiID
                                    .split('-')
                                    .slice(1)
                                    .toString()
                            )
                    }}
                </button>
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
