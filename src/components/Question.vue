<template>
  <div id="question">
    <h1>Question</h1>
    <button v-on:click="obtenirUneQuestion">Obtenir une question</button>
    <h2>{{ enonce }}</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Question",

  data() {
    return {
      enonce: "",
    };
  },

  methods: {
    obtenirUneQuestion() {
      this.enonce = axios
        .get(
          "https://fb21cf46-76f2-4f2c-ae0d-2d2aa69baf67.mock.pstmn.io/question"
        )
        .then((response) => {
          this.enonce = response.data.Question.énoncé;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>