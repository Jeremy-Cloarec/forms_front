
    <template>
        <div>
            <h1>yy</h1>
            <!-- Contenu du formulaire -->
        </div>
    </template>

    <script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const form = ref(null);

    async function fetchForm() {
        try {
            const response = await axios.get('http://localhost:1337/api/forms/109');
            form.value = response.data.data;
            console.log(form.value);
        } catch (error) {
            console.error('Error fetching form:', error);
        }
    }

    onMounted(fetchForm);
    </script>
    