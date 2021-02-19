<template>

  <div class="left-column">
    <ul>
      <li v-for="(question, i ) in questions" :key="i">
        {{charger_etat(question, i)}}
        <Avancement v-on:load="charger_etat(question, i)" v-bind:question="question" v-bind:état="états[i]" />
        <button v-on:click="charger_tentatives(question)">Voir les solutions</button>
      </li>
    </ul>
  </div>
  
  <div class="right-column">
    <h1>Tentatives de l'utilisateur</h1>
    <div v-if="tentatives.length > 0">
      <Tentatives  v-bind:tentatives="tentatives"/>
    </div>
    <div v-else>
      <h3>aucune tentative à afficher</h3>
    </div>
  </div>
  
</template>

<script>
import Avancement from "@/components/Avancement"
import get_api_response from "@/util/get_api_response";
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
      questions:[
        '/user/jdoe/categorie_toto/question/1',
        '/user/jdoe/categorie_toto/question/2',
        '/user/jdoe/categorie_toto/question/3'
        ]
    }
  },
  methods:{
    charger_tentatives(question){
      get_api_response(question)
          .then(res=>{
            this.tentatives=res.tentative
          })
    },
    charger_etat(question, i){
      get_api_response(question)
          .then(res=>{
            this.états[i]=res.état
          })
    }
  }

}
</script>

<style>

li{
  list-style: none;
}

.left-column{
  width: 50%;
  float: left;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
