<script>
import axios from 'axios';
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import api from "../api";

export default {
  data() {
    return {
      formData: {
        nom: '',
        prenom: '',
        date_de_naissance: '',
        statut: '',
        type_de_carte: '',
        numero_carte: '',
        commentaire: ''
      },
      fetchedData: [],
      error: null,
      statutOptions: ["À traiter", "Traité", "Annulé", "En attente"],
      typeCarteOptions: ["Técély", "OùRA!"]
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:1337/api/p-r-velos'); // Change the URL as needed
      this.fetchedData = response.data.data;
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    handleSubmit: async function (e) {
      e.preventDefault();

      console.log('Sending form data:', this.formData);

      try {
        const response = await axios.post('http://localhost:1337/api/p-r-velos', {
          data: this.formData
        });
        console.log('Response:', response);
        // Optionally, update the fetched data list with the new entry
        this.fetchedData.push(response.data.data);
      } catch (error) {
        this.error = error;
      }
    }
  }
};
</script>

<template>
  <div class="editor">
    <form id="form" v-on:submit="handleSubmit">
      <input id="nom" type="text" v-model="formData.nom" name="nom" placeholder="Nom">
      <input id="prenom" type="text" v-model="formData.prenom" name="prenom" placeholder="Prénom">
      <input id="date_de_naissance" type="date" v-model="formData.date_de_naissance" name="date_de_naissance" placeholder="Date de naissance">
      <select v-model="formData.statut" name="statut">
        <option disabled value="">Statut</option>
        <option v-for="option in statutOptions" :key="option" :value="option">{{ option }}</option>
      </select>
      <select v-model="formData.type_de_carte" name="type_de_carte">
        <option disabled value="">Type de carte</option>
        <option v-for="option in typeCarteOptions" :key="option" :value="option">{{ option }}</option>
      </select>
      <input id="numero_carte" type="text" v-model="formData.numero_carte" name="numero_carte" placeholder="Numéro de carte">
      <textarea v-model="formData.commentaire" name="commentaire" placeholder="Commentaire"></textarea>
      <input class="button" type="submit" value="Submit" />
    </form>
    <div v-if="fetchedData.length">
      <h2>Fetched Data:</h2>
      <ul>
        <li v-for="item in fetchedData" :key="item.id">
          <p><strong>Nom:</strong> {{ item.attributes.nom }}</p>
          <p><strong>Prénom:</strong> {{ item.attributes.prenom }}</p>
          <p><strong>Date de naissance:</strong> {{ item.attributes.date_de_naissance }}</p>
          <p><strong>Statut:</strong> {{ item.attributes.statut }}</p>
          <p><strong>Type de carte:</strong> {{ item.attributes.type_de_carte }}</p>
          <p><strong>Numéro de carte:</strong> {{ item.attributes.numero_carte }}</p>
          <p><strong>Commentaire:</strong> {{ item.attributes.commentaire }}</p>
        </li>
      </ul>
    </div>
    <div v-if="error" class="error">
      <p>Error: {{ error.message }}</p>
    </div>
  </div>
</template>

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
