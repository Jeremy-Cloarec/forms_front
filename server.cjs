const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

const fileContent = require('./backend_fs/fileContent.cjs');

app.get('/', (req, res) => {
    res.send('Hello on the form buider project')
})

// Fonction pour mettre à jour un fichier
async function updateFile(filePath, referenceIndex, replaceContent) {
    // Lire le fichier
    let data = await fs.readFile(filePath, 'utf8');
    // Trouver la position d'insertion
    const insertPosition = data.lastIndexOf(referenceIndex);
    // Si la position est trouvée, insérer le nouveau contenu
    if (insertPosition !== -1) {
        console.log('Insertion position:', insertPosition);
        const before = data.slice(0, insertPosition);
        const after = data.slice(insertPosition);

        const updatedData = before + replaceContent + after;
        await fs.writeFile(filePath, updatedData, 'utf-8')
    } else {
        console.error('Reference index not found:', reference);
    }
}

app.post('/write-file', async (req, res) => {
    const { formId, formName } = req.body;
    let fileName = `${formId}-${formName.replace(/\s+/g, '-').toLowerCase()}`;
    const insertAbove = "<!-- insert above -->";

    // Définir les chemins des fichiers
    const newFormFilePath = path.join(__dirname, 'src/components/admin/forms_admin', `${fileName}.vue`);
    const routerFilePath = path.join(__dirname, 'src/router.js');
    const adminHomFilePath = path.join(__dirname, 'src/components/admin/HomeAdmin.vue');

    // Contenu à ajouer
    const newRoute = `\n    { path: "/admin/${fileName}", component: () => import("./components/admin/forms_admin/${fileName}.vue") },\n`;
    const newButton = `\n            <button @click="router.push('/admin/${fileName}')">Go to ${formName}</button>\n`;

    // Générer le contenu du formulaire
    const generateFileContent = fileContent(formId);

    try {
        // Créer le fichier du nouveau formulaire
        await fs.writeFile(newFormFilePath, generateFileContent);
        console.log(`Le fichier ${fileName} a été créé avec succès`);

        // Mettre à jour le fichier router.js
        await updateFile(
            routerFilePath,
            '// insert above',
            newRoute
        );

        // Mettre à jour le fichier HomeAdmin.vue
        await updateFile(
            adminHomFilePath,
            "<!-- insert above -->",
            newButton
        );

    } catch (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Error writing file');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
