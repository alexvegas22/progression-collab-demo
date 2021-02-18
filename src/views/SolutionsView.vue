<template>
  <img alt="Vue logo" src="../assets/logo.png">

  <ul>
    <li v-for="(question, i ) in questions" :key="i">
      {{charger_etat(question, i)}}
      <Avancement v-on:load="charger_etat(question, i)" v-bind:question="question" v-bind:état="états[i]" />
      <button v-on:click="charger_tentatives(question)">Charger solutions</button>
    </li>
  </ul>
  <Tentatives v-bind:tentatives="tentatives"/>
</template>

<script>
import Avancement from "@/components/Avancement"
import get_solutions_user from "@/util/get_solutions_user";
import Tentatives from "@/components/Tentatives";


export default {
  name: 'SolutionsView',
  components: {
    Tentatives,
    Avancement
  },
  data(){

    return {
      tentatives: [],
      états:[],
      questions:['/user/jdoe/categorie_toto/ma_question',
        '/user/jdoe/categorie_toto/ma_question_reussie',
        '/user/jdoe/categorie_toto/ma_question_pas_repondue']
    }
  },
  methods:{
    charger_tentatives(question){
      get_solutions_user(question)
          .then(res=>{
            this.tentatives=res.tentative
          })
    },
    charger_etat(question, i){
      get_solutions_user(question)
          .then(res=>{
            this.états[i]=res.état
          })
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
