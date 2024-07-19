
const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());

app.post('/write-file', (req, res) => {
    const { formId, formName, content } = req.body;
    let fileName = `${formId}-${formName}`;

    //Définir chemin et contenu du fichier
    const filePath = path.join(__dirname, 'src/components/admin/forms_admin', `${fileName.replace(/\s+/g, '-').toLowerCase()}.vue`);
    const fileContent = `
    <template>
        <div>
            <h1>${formName}</h1>
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

    const filesOp = async () => {
        try {
            await fs.writeFile(filePath, fileContent, (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).send('Error writing file');
                }

                // Lire le fichier router.js
                console.log(`Le fichier ${fileName.replace(/\s+/g, '-').toLowerCase()} a été créé avec succès`);
            });

            

            // await fs.readFile(routerFilePath, 'utf8', (err, data) => {
            //     if (err) {
            //         console.error('Error reading router file:', err);
            //         return res.status(500).send('Error reading router file');
            //     }

            //     // Trouver l'endroit où ajouter la nouvelle route
            //     const newRoute = `\n    { path: "/admin/form${formId}", component: () => import("./components/admin/forms_admin/Form${formId}.vue") },`;
            //     const updatedRouterContent = data.replace(
            //         /(const routes = \[)([^]*)(\];)/,
            //         `$1$2${newRoute}$3`
            //     );
            // });

            // Écrire le fichier router.js mis à jour
            // await fs.writeFile(routerFilePath, updatedRouterContent, (err) => {
            //     if (err) {
            //         console.error('Error writing router file:', err);
            //         return res.status(500).send('Error writing router file');
            //     }
            //     res.send({ message: 'File and route added successfully' });
            // });

        } catch (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error writing file');
        }
    }
    filesOp();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

