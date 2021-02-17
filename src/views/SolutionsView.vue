<template>
  <img alt="Vue logo" src="../assets/logo.png">

  <ul>
    <li v-for="(question, i ) in questions" :key="i">
      {{charger_etat(question, i)}}
      <Avancement v-on:load="charger_etat(question, i)" v-bind:question="question" v-bind:état="états[i]" />
      <button v-on:click="charger_solutions(question)">Charger solutions</button>
    </li>
  </ul>
  <Solutions v-bind:solutions="solutions" />
</template>

<script>
import Solutions from "@/components/Solutions";
import get_solutions_user from "@/util/get_solutions_user";
import Avancement from "@/components/Avancement"


export default {
  name: 'SolutionsView',
  components: {
    Avancement,
    Solutions
  },
  data(){
    return {
      solutions: [],
      états:[],
      questions:['ma_question', 'ma_question_reussie', 'ma_question_pas_repondue']
    }
  },
  methods:{
    charger_solutions(question){
      get_solutions_user(question)
          .then(res=>{
            this.solutions=res.solutions;
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
