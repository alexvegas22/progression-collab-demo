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
import { getRetroaction } from '../util/solution';

export default {
  name: "Feedback",

  data() {
    return {
      feedBack:null,
    };
  },

  methods: {
    obtenirRetroaction() {
      getRetroaction().then(
        retroaction => {
            this.feedBack = retroaction;
        }
      ).catch(
        err =>{
            console.log(err);
            this.feedBack = "";
        }
      )
    },
  },
};
</script>
