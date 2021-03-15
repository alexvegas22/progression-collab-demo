<template>
  <!--TODO: s'entendre sur le composant ébauche, fusionner les deux ou prendre un seul.-->
  <div class="question">
    <Enonce
      v-bind:titre="question.attributes?.titre"
      v-bind:enonce="question.attributes?.énoncé"
    />
    <hr>

    <div class="editeur-container">
      <div class="division">
        <EditeurCode :question="question" />
      </div>
      <div class="division">
        <Feedback v-bind:feedBack="feedBack"/>
        <button class="valider" v-on:click="obtenirRetroaction">Cliquer</button>
      </div>
    </div>

    <hr>
    <!--Ebauche v-bind:ebauches="ebauches"/-->
    <hr>

    <div style="width: 100%">
      <Avancement/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Enonce from "@/components/Question/Enonce.vue";
import Feedback from "@/components/Question/Feedback.vue";
import EditeurCode from '@/components/Question/Editeur.vue'
import Avancement from '@/components/Question/Avancement.vue'
//import Ebauche from "@/components/Question/Ebauche";

import { getRetroaction } from '@/util/solution';

const BASE_URL = process.env.VUE_APP_API_URL_QUESTION // json-server

export default {
  name: "Question",
  components: {
    Enonce,
    Feedback,
    Avancement,
    //Ebauche,
    EditeurCode
  },
  data() {
     return {
         ebauches:[], // liste d'ébauche
         feedBack: null
     }
  },
  computed: {
    question () {
      return this.$store.state.question
    }
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
  mounted() {
    this.$store.dispatch('getQuestion', BASE_URL)
  }
};
</script>

<style>
  .editeur-container {
    height: 650px;
    padding: 20px 0px;
  }

  .division {
    width: 50%;
    height: 200px;
    float: left;
  }

  body {
    font-family: "Avenir", Arial, Helvetica, sans-serif;
    font-size: 16px;
  }

  .ebauche {
    display: flex;
    padding: 1rem;
    margin: 1rem;
    background: darkgray;
  }
</style>
