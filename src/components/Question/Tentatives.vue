<template>
  <div>

    <div v-bind:key="tentative.date_soumission" v-for="tentative in tentatives">
      <a v-on:click="afficherTentative(tentative)">Solution du {{convetirDateDepuisTimeStamp(tentative.date_soumission)}} </a>
    </div>

    <div v-if="tentativeAffichee.solution">
      <h3>Détail d'une solution</h3>
      <p>Langage id: {{solution.langage}}</p>
      <p>Langage : {{convertirLangageNbrEnString(solution.langage)}}</p>
      <p>Code: {{solution.code}}</p>
      <p>FeedBack: {{tentativeAffichee.feedback}}</p>
    </div>

  </div>

</template>

<script>


  export default {
    name:"Tentatives",
    props:{
      tentatives:Array,
      tentativeAffichee:"",
      afficherTentative:Function,
      solution:""
    }
    ,
    methods:{
      // method to convert timestamp to dd/mm/yyyy hh:mm
      convetirDateDepuisTimeStamp : function (timestanp) {
        let date = new Date(timestanp*1000)
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`
      },

      // method to convert language value to string
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
      }

    }
  }


</script>
