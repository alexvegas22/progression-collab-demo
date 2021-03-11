<template>

  <Avancement v-bind:question="questionAvancement"/>
  
  
  
  
  <!-- <div class="left-column">
    <ul>
      <li v-for="(question, i ) in questions" :key="i">
        {{charger_etat(question, i)}}
        <Avancement v-on:load="charger_etat(question, i)" v-bind:question="question" v-bind:état="états[i]" />
        <button @click="charger_tentatives(question)">Voir les solutions</button>
      </li>
    </ul>
  </div>

  <div class="left-column">
    <h1>Tentatives de l'utilisateur</h1>
    <div v-if="tentatives.length > 0" >
      <h3 id="solution-message">Cliquez sur une tentative pour voir la solution proposée</h3>
      <Tentatives v-bind:tentativeAffichee="tentativeAffichee" v-bind:solution="solution" v-bind:afficher-tentative="afficherTentative"  v-bind:tentatives="tentatives"/>
    </div>
    <div v-else>
      <h3>aucune tentative à afficher</h3>
    </div>
  </div> -->

</template>

<script>
import Avancement from "@/components/Question/Avancement"
// import getAvancement from "@/util/Avancement";
// import Tentatives from "@/components/Question/Tentatives";


// export default {
//   name: 'Solution',
//   components: {
//     Tentatives,
//     Avancement
//   },
//   data(){
//     return {
//       tentatives: [],
//       états:[],
//       questions:[
//         '/user/jdoe/categorie_toto/question/1',
//         '/user/jdoe/categorie_toto/question/2',
//         '/user/jdoe/categorie_toto/question/3'
//         ],
//       tentativeAffichee:{
//         feedback:"",
//         date_soumission:"",
//         solution: null
//       },
//       solution:{
//         langage:"",
//         code:""
//       }

//     }
//   },
//   methods:{
//     charger_tentatives(question){
//       getAvancement(question)
//           .then(res=>{
//             this.tentatives=res.tentative
//           })
//     },
//     charger_etat(question, i){
//       getAvancement(question)
//           .then(res=>{
//             this.états[i]=res.état
//           })
//     },
//     afficherTentative(tentative){
//       getAvancement("/tentative/"+tentative.date_soumission)
//           .then(
//               response=>{
//                 this.tentativeAffichee.date_soumission = response.date_soumission
//                 this.tentativeAffichee.feedback = response.feedback
//                 this.tentativeAffichee.solution = response.solutions
//                 this.afficherSolution(response.solutions)
//               })
//           .catch(err=>{
//             this.erreurs = err;
//           })
//     },

//     afficherSolution(url_solution){
//       getAvancement(url_solution)
//           .then(
//               response=>{
//                 this.solution.langage = response.langage
//                 this.solution.code = response.code
//                 console.log(this.solution)
//               })
//           .catch(err=>{
//             console.log(err)
//             this.erreurs = err;
//           });
//     }
//   }

// }
</script>

<style>

li{
  list-style: none;
}

.left-column{
  width: 100%;
  float: left;
}

</style>
