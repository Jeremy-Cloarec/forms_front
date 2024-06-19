<template>
  <div class="editor">
    <h2>P + R Vélos</h2>
    <form id="form" @submit="handleSubmit">
      <input id="nom" type="text" v-model="formData.nom" name="nom" placeholder="Nom" />
      <input id="prenom" type="text" v-model="formData.prenom" name="prenom" placeholder="Prénom" />
      <input id="email" type="email" v-model="formData.email" name="email" placeholder="Email" />
      <input id="date_de_naissance" type="date" v-model="formData.date_de_naissance" name="date_de_naissance"
        placeholder="Date de naissance" />
      <select v-model="formData.statut" name="statut">
        <option disabled value="">Statut</option>
        <option v-for="option in statutOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <select v-model="formData.type_de_carte" name="type_de_carte">
        <option disabled value="">Type de carte</option>
        <option v-for="option in typeCarteOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <input id="numero_carte" type="text" v-model="formData.numero_carte" name="numero_carte"
        placeholder="Numéro de carte" />
      <textarea v-model="formData.commentaire" name="commentaire" placeholder="Commentaire"></textarea>
      <input type="file" @change="handleFileChange" name="file" />
      <input type="file" multiple @change="handleMultipleFilesChange" name="multipleFiles" />
      <input class="button" type="submit" value="Submit" />
    </form>
    <div v-if="fetchedData.length">
      <h2>Fetched Data:</h2>
      <ul>
        <li v-for="item in fetchedData" :key="item.id">
          <p><strong>Nom:</strong> {{ item.attributes.nom }}</p>
          <p><strong>Prénom:</strong> {{ item.attributes.prenom }}</p>
          <p><strong>Prénom:</strong> {{ item.attributes.email }}</p>
          <p>
            <strong>Date de naissance:</strong> {{ item.attributes.date_de_naissance }}
          </p>
          <p><strong>Statut:</strong> {{ item.attributes.statut }}</p>
          <p><strong>Type de carte:</strong> {{ item.attributes.type_de_carte }}</p>
          <p><strong>Numéro de carte:</strong> {{ item.attributes.numero_carte }}</p>
          <p><strong>Commentaire:</strong> {{ item.attributes.commentaire }}</p>
          <p>
            <strong>Un fichier : </strong>
            <a :href="'http://localhost:1337' + item.attributes.fichier.data.attributes.url
              " target="_blank">{{ item.attributes.fichier.data.attributes.name }}</a>
          </p>
          <p><strong>Plusieurs fichiers:</strong></p>
          <ul>
            <li v-for="file in item.attributes.fichiers.data" :key="file.id">
              <a :href="'http://localhost:1337' + file.attributes.url" target="_blank">{{
                file.attributes.name
              }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div v-if="error" class="error">
      <p>Error: {{ error.message }}</p>
    </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  data() {
    return {
      formData: {
        nom: "",
        prenom: "",
        email: "",
        date_de_naissance: "",
        statut: "",
        type_de_carte: "",
        numero_carte: "",
        commentaire: "",
        file: null,
        multipleFiles: [],
      },
      fetchedData: [],
      error: null,
      statutOptions: ["À traiter", "Traité", "Annulé", "En attente"],
      typeCarteOptions: ["Técély", "OùRA!"],
    };
  },
  async mounted() {
    try {
      const response = await api.get("/p-r-velos");
      this.fetchedData = response.data.data;
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    handleFileChange(event) {
      this.formData.file = event.target.files[0];
    },
    handleMultipleFilesChange(event) {
      this.formData.multipleFiles = Array.from(event.target.files);
    },
    async handleSubmit(e) {
      e.preventDefault();

      try {
        let fileId = null;
        let multipleFileIds = [];

        // Upload the image file
        if (this.formData.file) {
          const fileData = new FormData();
          fileData.append("files", this.formData.file);

          const fileUploadResponse = await api.post("/upload", fileData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (fileUploadResponse.data && fileUploadResponse.data.length > 0) {
            fileId = fileUploadResponse.data[0].id; // Update formData with the file id
          }
        }

        // Upload the multiple files
        if (this.formData.multipleFiles.length > 0) {
          const multipleFileData = new FormData();
          this.formData.multipleFiles.forEach((file) => {
            multipleFileData.append("files", file);
          });

          const multipleFilesUploadResponse = await api.post(
            "/upload",
            multipleFileData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (
            multipleFilesUploadResponse.data &&
            multipleFilesUploadResponse.data.length > 0
          ) {
            multipleFileIds = multipleFilesUploadResponse.data.map((file) => file.id); // Get the ids of the uploaded files
          }
        }

        console.log("FormData:", this.formData);

        const submissionData = {
          nom: this.formData.nom,
          prenom: this.formData.prenom,
          email: this.formData.email,
          date_de_naissance: this.formData.date_de_naissance,
          statut: this.formData.statut,
          type_de_carte: this.formData.type_de_carte,
          numero_carte: this.formData.numero_carte,
          commentaire: this.formData.commentaire,
          fichier: fileId,
          fichiers: multipleFileIds,
        };

        // Submit the form data
        const response = await api.post("/p-r-velos", {
          data: submissionData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Response:", response);
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style>
.button {
  background-color: #c4c4c4;
}

.editor form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>
