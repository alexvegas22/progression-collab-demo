<template :idSolution = "id">
  <div>
    <h3>Component solution</h3>
    <p>Langage id: {{solution.langage}}</p>
    <p>Langage : {{convertirLangageNbrEnString(solution.langage)}}</p>
    <p>Date de soumission: {{solution.date_soumission}}</p>
    <p>Code: {{solution.code}}</p>
    <p>FeedBack: {{solution.feedback}}</p>
  </div>
</template>


<script>
import get_solution from '../util/solution'

export default {
  props:{
    solution:Object,
    'idSolution': Number,
    date_soumission:Number,
    langage: Number,
    code: String,
    feedback:String
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