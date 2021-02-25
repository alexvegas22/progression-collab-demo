<template>
  <div class="question">
    <Enonce />

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
    <Ebauche v-bind:ebauches="ebauches"/>
    <hr>

    <div style="width: 100%">
      <Solution />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Enonce from "@/components/Question/Énoncé.vue";
import Feedback from "@/components/Question/Feedback.vue";
import EditeurCode from '@/components/Question/Editeur.vue'
import Solution from '@/components/Question/Solution.vue'
import Ebauche from "@/components/Question/Ebauche";

import get_question from '@/util/question'

export default {
  name: "Question",
  components: {
    Enonce,
    Feedback,
    EditeurCode,
    Solution,
    Ebauche
  },
  data(){
    return {
      ebauches:[], // liste d'ébauche

      question: get_question().then(
          response => {
            this.question = response;
            this.ebauches = response.question_prog.ébauches;
          }
      ).catch(
          err => {
            console.log(err);
          }
      )

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
