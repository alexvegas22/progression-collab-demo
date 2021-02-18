<template :idSolution = "id">
  <div>
    <h3>Component solution</h3>
    <p>Langage id: {{langage}}</p>
    <p>Langage : {{convertirLangageNbrEnString(langage)}}</p>
    <p>Date de soumission: {{date_soumission}}</p>
    <p>Code: {{code}}</p>
    <p>FeedBack: {{feedback}}</p>
  </div>
</template>


<script>
import get_solution from '../util/solution'

export default {
  props:{
    'idSolution': Number
  },
  data(){
    return {
      date_soumission: "",
      langage: "",
      code: "",
      feedback: ""
    };
  },
  created(){
    get_solution(this.idSolution)
          .then(
            response=>{
              this.date_soumission = new Date(response.date_soumission * 1000);
              this.langage = response.langage;
              this.code = response.code;
              this.feedback = response.feedback
            })
        .catch(err=>{
          this.erreurs = err;
        });
  },
  methods: {
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