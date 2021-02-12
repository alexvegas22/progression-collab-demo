<template>
  <div id="Retroaction">
    <h1>Rétroaction</h1>
    <button v-on:click="obtenirRetroaction">Cliquer</button></br>
    <h2>Votre solution est: </br>{{solution}}</h2>
    <h2>Voici les tests effectués: </br>{{test}}</h2>
    <table>
        <tr>
            <th>Test</th>
            <th>Votre Entré</th>
            <th>Sortie Atendue</th>
            <th>Sortie Observé</th>
        </tr>
        <tr>
            <th>{{test.numéro}}</th>
            <th>{{test.entrée}}</th>
            <th>{{test.sortie_attendue}}</th>
            <th>{{test.sortie_observée}}</th>
        </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Question",

  data() {
    return {
      solution: "",
      test:"",
    };
  },

  methods: {
    obtenirRetroaction() {
      this.sortieObserver = axios
        .get(
          "https://fb21cf46-76f2-4f2c-ae0d-2d2aa69baf67.mock.pstmn.io/retroaction"
        )
        .then((response) => {
          this.solution = response.data.Solution;
          this.test = response.data.Test;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>
