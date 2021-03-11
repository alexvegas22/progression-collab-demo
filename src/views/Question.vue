<template>
  <!--TODO: s'entendre sur le composant ébauche, fusionner les deux ou prendre un seul.-->
  <div class="question">
    <Enonce v-bind:enonce="enonce" />
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
      <Solution />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Enonce from "@/components/Question/Enonce.vue";
import Feedback from "@/components/Question/Feedback.vue";
import EditeurCode from '@/components/Question/Editeur.vue'
import Solution from '@/components/Question/Solution.vue'
//import Ebauche from "@/components/Question/Ebauche";
import JeuTests from '@/components/Question/JeuTests';

import get_question from '@/util/question'
import { getRetroaction } from '@/util/solution';

export default {
  name: "Question",
  components: {
    Enonce,
    Feedback,
    Solution,
    //Ebauche,
    EditeurCode,
    JeuTests
  },
  data() {
     return {
         //ebauches:[], // liste d'ébauche
         feedBack: null,
         enonce:null,
        question: get_question().then(
         response => {
            this.enonce = response.attributes.énoncé;
            this.question = response;
           // this.ebauches = response.question_prog.ébauches;
         }
       ).catch(
         err=>{
          console.log(err);
         }
       )
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
