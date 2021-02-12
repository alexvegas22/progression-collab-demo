<template>

</template>
<ul v-for="(resultat, index) in résultats" :key="index"> <!--TODO voir quoi mettre dans key-->
  <li>{{resultat.résultat}}</li>
  <li>{{resultat.sortie_erreur}}</li>
  <li>{{resultat.sortie_observée}}</li>
  <li>{{resultat.feedback}}</li>
</ul>
  <h3>{{feedback}}</h3>
<script>

import post_valider_tentative from '../util/requête_validitation_tentative'
export default {
  name: "ValidationReponse",
  data() {
    return {
      resultats:[],
      feedback: ""
    }
  },
  created() {
    post_valider_tentative("{String exampleCode== 5+5}")
        .then(
            response => {
              this.resultats = response.résultats
              this.feedback = response.feedback
            })
        .catch(err => {
          this.erreurs = err
        })
  }
}
</script>

<style scoped>

</style>
