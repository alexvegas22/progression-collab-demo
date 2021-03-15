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

      </div>
    </div>
    <hr>
    <div>
       <JeuTests v-bind:tests="listetests"/>
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
import EditeurCode from '@/components/Question/Editeur.vue'
import Solution from '@/components/Question/Solution.vue'
//import Ebauche from "@/components/Question/Ebauche";
import JeuTests from '@/components/Question/JeuTests';
// import get_question from '@/util/question'

const BASE_URL = process.env.VUE_APP_API_URL_QUESTION // json-server

export default {
  name: "Question",
  components: {
    Enonce,
    Solution,
    //Ebauche,
    EditeurCode,
    JeuTests
  },
  data() {
     return {
         ebauches:[], // liste d'ébauche
         listetests: null
     }
  },
  computed:{
    tests(){
      return this.$store.state.tests
    },
    question () {
      return this.$store.state.question
    }
  },
  mounted() {
    this.$store.dispatch('getTests').then(
        //response=>{this.listetests = this.tests}
    )
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
