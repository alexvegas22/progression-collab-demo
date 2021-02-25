<template>
  <div class="question">
    <Enonce v-bind:question="question" />
    <hr>

    <div class="editeur-container">
      <div class="division">
        <EditeurCode />
      </div>
      <div class="division">
        <Feedback />
      </div>
    </div>

    <hr>

    <p>Voici les ébauches disponibles :</p>
    <div class="ebauche" v-bind:key="ebauche" v-for="ebauche in ebauches">
        <p>{{ebauche}}</p>
    </div>

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

import get_question from '@/util/question'

export default {
  name: "Question",
  components: {
    Enonce,
    Feedback,
    EditeurCode,
    Solution,
  },
  data() {
     return {
       
       question: get_question().then(
         response => {
            this.question = response;
         }
       ).catch(
         err=>{
          console.log(err);
         }
       )
       /*
         question: get_question('programmation_1', 'les_variables', 'introduction_aux_variables', 'python').then(
             response => {
                 this.question = response;
                 this.ebauches = response.question_prog.ébauches;
             }
         ).catch(
             err => {
                 console.log(err);
             }
         )*/
     }
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
