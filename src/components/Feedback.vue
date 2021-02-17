<template>
  <div  id="Retroaction">
    <h1>Rétroaction</h1>
    <button v-on:click="obtenirRetroaction">Cliquer</button>
    <div v-if="feedBack != null" id="Retroaction-principale">
        <h2 >Feedback: </h2>
        <h3>{{feedBack}}</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Feedback",

  data() {
    return {
      feedBack:null,
    };
  },

  methods: {
    obtenirRetroaction() {
      this.sortieObserver = axios
        .post(
          "https://fb21cf46-76f2-4f2c-ae0d-2d2aa69baf67.mock.pstmn.io/solution_false",
          {codeJson: 'vocimoncode'}
        )
        .then((response) => {
          this.feedBack = response.data.data.included.attributes.feedback;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>
