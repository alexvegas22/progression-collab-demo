<template>
  <div  id="Retroaction">
    <h1>Rétroaction</h1>
    <button v-on:click="obtenirRetroaction">Cliquer</button></br>
    <div v-if="test != null" id="Retroaction-principale">
        <h2 >Conseil: </br></h2>
        <h3>{{test}}</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Feedback",

  data() {
    return {
      test:null,
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
          this.test = response.data.data.attributes.feedback;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>
