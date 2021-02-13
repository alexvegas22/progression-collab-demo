<template>
  <div id="Retroaction">
    <h1>Rétroaction</h1>
    <button v-on:click="obtenirRetroaction">Cliquer</button></br>
    <h2>Voici les tests effectués: </br></h2>
    <table>
        <tr>
            <th>Test</th>
            <th>Résultat</th>
            <th>Votre Entré</th>
            <th>Sortie Atendue</th>
            <th>Sortie Observé</th>
        </tr>
        <tr>
            <th>{{test}}</th>
            <th>{{test}}</th>
            <th>{{test}}</th>
            <th>{{test}}</th>
            <th>{{test}}</th>
        </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Feedback",

  data() {
    return {
      solution: "",
      test:"",
    };
  },

  methods: {
    obtenirRetroaction() {
      this.sortieObserver = axios
        .post(
          "https://fb21cf46-76f2-4f2c-ae0d-2d2aa69baf67.mock.pstmn.io/solution_retroaction",
          {codeJson: 'vocimoncode'}
        )
        .then((response) => {
          this.solution = response.data;
          this.test = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>
