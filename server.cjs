const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());

const fileContent = require('./backend_files/fileContent.cjs');

app.get('/', (req, res)=> {
    res.send('Hello on the form buider project')
})

app.post('/write-file', async (req, res) => {
    const { formId, formName } = req.body;
    let fileName = `${formId}-${formName.replace(/\s+/g, '-').toLowerCase()}`;

    // Définir chemin et contenu du fichier
    const filePath = path.join(__dirname, 'src/components/admin/forms_admin', `${fileName}.vue`);
    const routerFilePath = path.join(__dirname, 'src/router.js');
    const adminHomFilePath = path.join(__dirname, 'src/components/admin/HomeAdmin.vue');

    // Route à ajouter
    const newRoute = `\n    { path: "/admin/${fileName}", component: () => import("./components/admin/forms_admin/${fileName}.vue") },`;

    const generateFileContent = fileContent(formId);

    try {
        // Créer le fichier du nouveau formulaire
        await fs.writeFile(filePath, generateFileContent);
        console.log(`Le fichier ${fileName} a été créé avec succès`);

        // Lire le fichier router.js
        let dataRouter = await fs.readFile(routerFilePath, 'utf8');

        // Trouver la position d'insertion avant la création du routeur
        const insertPositionRoute = dataRouter.lastIndexOf('const router = createRouter({');

        // Si la position est trouvée, insérer la nouvelle route
        if (insertPositionRoute !== -1) {
            const before = dataRouter.slice(0, insertPositionRoute);
            const after = dataRouter.slice(insertPositionRoute);

            // Mise à jour du tableau de routes
            const updatedRoutes = before.replace(']', `${newRoute}\n]`);
            const updatedData = updatedRoutes + after;

            await fs.writeFile(routerFilePath, updatedData, 'utf-8')
        }

        // Lire le fichier HomeAdmin.vue
        let dataHomeAdmin = await fs.readFile(adminHomFilePath, 'utf8');
        const insertPositionHomeAdmin = dataHomeAdmin.lastIndexOf(' <!-- Add button to new form befor this line -->');
        console.log(insertPositionHomeAdmin);
        if (insertPositionHomeAdmin !== -1) {
            const beforeAdmin = dataHomeAdmin.slice(0, insertPositionHomeAdmin);
            const afterAdmin = dataHomeAdmin.slice(insertPositionHomeAdmin);

            const newButton = `
                <button @click="router.push('/admin/${fileName}')">Go to ${formName}</button>
            `;
            const updatedHomeAdmin = beforeAdmin + newButton + afterAdmin;
            await fs.writeFile(adminHomFilePath, updatedHomeAdmin, 'utf-8');
        }


    } catch (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Error writing file');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
