<template>
  <div>
    <div v-bind:key="solution.date_soumission" v-for="solution in solutions">

      <a href="#" v-on:click="afficherSolution(solution.date_soumission)">Solution du {{convetirDateDepuisTimeStamp(solution.date_soumission)}} </a>
      <!-- TODO : afficher les résultats à partir de la requete question/date_soumission de l'api -->
      <div style="" id="{{solution.date_soumission}}" ref="{{solution.date_soumission}}">
        <h1> id de la soumission (epoch time de la soumission de l'étudiant d'apres la doc de l'api : {{solution.date_soumission}} )</h1>

        <br>
        <h3>Date de la soumission(1er janvier 1970 + le nombre de secondes équivalentes à l'id)</h3>
        <p>{{convetirDateDepuisTimeStamp(solution.date_soumission)}}</p>
        <h4>le feedback de solution</h4>
        <p>{{solution.feedback}}</p>
        <h5>le langage de la solution</h5>
        <p>{{convertirLangageNbrEnString(solution.langage)}}</p>
        <h6>le code de la solution</h6>
        <p>{{solution.code}}</p>
        <p>---------------------------------------------------------------------------------------------------------------------------------</p>
        <br>
      </div>

    </div>
  </div>


</template>

<script>

export default {
  name:"Solutions",
  props:["solutions"],
  methods:{ convetirDateDepuisTimeStamp : function (timestanp) {
      return new Date(timestanp*1000)
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
          langageString = "Vous êtes qui vous ?"
      }
      return langageString
    },
    afficherSolution(id){
      console.log(id)//A supprimer ne compile pas si les variables ne sont pas utilisées
      //TODO
    }
  }
}


</script>