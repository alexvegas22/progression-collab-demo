<template>
  <div id="énoncé">
    <h1>Question</h1>
    <button v-on:click="obtenirUneQuestion">Obtenir une question</button>
    <h2>{{ enonce }}</h2>
  </div>
</template>

<script>
import { getEnonce } from "../util/enonce.js";

export default {
  name: "Énoncé",

  data() {
    return {
      enonce: "",
    };
  },

  methods: {
    obtenirUneQuestion() {
      getEnonce().then(
        enonce => {
            this.enonce = enonce;
        }
      ).catch(
        err => {
            console.log(err);
            this.enonce = "";
        }
      )
    },
  },
};
</script>
