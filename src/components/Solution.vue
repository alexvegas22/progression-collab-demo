<template>
  <div>
    <h3>Une solution</h3>
    <p>Langage id: {{langage}}</p>
  </div>
  
  

</template>


<script>
import get_solution from '../util/solution'

export default {
  data(){
    return {
      date_soumission: "",
      langage: "",
      code: "",
      feedback: ""
    };
  },
  created(){
    get_solution(1613094107)
          .then(
            response=>{
              this.date_soumission = response.date_soumission;
              this.langage = response.langage;
              this.code = response.code;
              this.feedback = response.feedback
            })          
          .catch(err=>{
              this.erreurs = err;
          }); 
    
  }
}  
</script>