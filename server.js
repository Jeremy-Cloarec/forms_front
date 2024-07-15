import fs from 'fs';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());

// Obtenir le nom de fichier et le répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post('/write-file', (req, res) => {
    const { formId, formName, content } = req.body;

    //Définir chemin et contenu du fichier
    const filePath = path.join(__dirname, 'src/components/admin/forms_admin', `Form${formId}.vue`);
    const fileContent = `
    <template>
        <div>
            <h1>Form ${formId}</h1>
            <!-- Contenu du formulaire -->
        </div>
    </template>

    <script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const form = ref(null);

    async function fetchForm() {
        try {
            const response = await axios.get('http://localhost:1337/api/forms/${formId}');
            form.value = response.data.data;
            console.log(form.value);
        } catch (error) {
            console.error('Error fetching form:', error);
        }
    }

    onMounted(fetchForm);
    </script>
    `;

    // Écrire le fichier
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error writing file');
        }

        // Lire le fichier router.js
        const routerFilePath = path.join(__dirname, 'src/router.js');
        console.log(routerFilePath);

        fs.readFile(routerFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading router file:', err);
                return res.status(500).send('Error reading router file');
            }

            // Trouver l'endroit où ajouter la nouvelle route
            const newRoute = `\n    { path: "/admin/form${formId}", component: () => import("./components/admin/forms_admin/Form${formId}.vue") },`;
            const updatedRouterContent = data.replace(
                /(const routes = \[)([^]*)(\];)/,
                `$1$2${newRoute}$3`
            );

            // Écrire le fichier router.js mis à jour
            fs.writeFile(routerFilePath, updatedRouterContent, (err) => {
                if (err) {
                    console.error('Error writing router file:', err);
                    return res.status(500).send('Error writing router file');
                }
                res.send({ message: 'File and route added successfully' });
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

