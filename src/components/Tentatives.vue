<template>
  <div>
    <div v-bind:key="tentative.date_soumission" v-for="tentative in tentatives">
      <a v-on:click="afficherSolution(tentative)">Solution du {{convetirDateDepuisTimeStamp(tentative.date_soumission)}} </a>
    </div>

    <div v-if="solutionEnCoursVisonement">
      <h3>Component solution</h3>
      <p>Langage id: {{solution.langage}}</p>
      <p>Langage : {{convertirLangageNbrEnString(solution.langage)}}</p>
      <p>Date de soumission: {{tentativeAffichee.date_soumission}}</p>
      <p>Code: {{solution.code}}</p>
      <p>FeedBack: {{tentativeAffichee.feedback}}</p>
    </div>
  </div>

</template>

<script>

import get_solutions_user from "@/util/get_solutions_user";
export default {
  name:"Tentatives",
  props:{
    tentatives:Array,
  },
  data(){
    return {
      solution:{
        langage:"",
        code:""
      },
      solutionEnCoursVisonement:"",
      tentativeAffichee:{
        feedback:"",
        date_soumission:""
      }
    }
  },
  methods:{
    convetirDateDepuisTimeStamp : function (timestanp) {
      var date = new Date(timestanp*1000)
      return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`
    },

  convertirLangageNbrEnString(langageNumero){
    let langageString
    switch (langageNumero) {

      case 0:
        langageString = "Python 2.7"
        break;
      case 1:
        langageString = "JAVA"
        break;
      case 2:
        langageString = "Python 3"
        break;
      default:
        langageString = "?"
    }
    return langageString
  },

  afficherSolution(tentative){
      get_solutions_user("/tentative/"+tentative.date_soumission)
      .then(
          response=>{

            this.tentativeAffichee.date_soumission = response.date_soumission
            this.tentativeAffichee.solution = response.solution

          })
          .catch(err=>{
            console.log(err)
            this.erreurs = err;
          })

          get_solutions_user(this.tentativeAffichee.solution)
          .then(
              response=>{
                this.solution.langage = response.langage
                this.solution.code = response.code
              })
          .catch(err=>{
            console.log(err)
            this.erreurs = err;
          });
    }
  }
}


</script>