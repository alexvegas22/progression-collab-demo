<template class="p-4">
  <div v-if="msgReponseApi.length>1" class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>{{msgReponseApi}}</strong>
  </div>

  <button type="button" class="btn btn-lg btn-primary" :disabled=envoiEnCours
          @click="validerTentative">envoie ta reponse</button>

  <div  v-if="resultats.length>=1" >
    <ul v-for="unResultat in resultats" :key="unResultat">
      <li>
        resultat: {{unResultat.attributes.résultat}}
      </li>
      <li>
        sortie d'erreur: {{unResultat.attributes.sortie_erreur}}
      </li>
      <li>
        sortie observée: {{unResultat.attributes.sortie_observée}}
      </li>
      <li>
        feedback: {{unResultat.attributes.feedback}}
      </li>
    </ul>

    <h4 v-if="feedback_global.length>0">Feedback global: {{feedback_global}}</h4>
    <h3 v-if="testsPassent!=null">Ta reponse est {{testsPassent ? "Bonne" : "Mauvaise" }}</h3>
  </div>

</template>
<script>

export default {
  name: "ValidationTentative",
  props: {
    code:String,
    langage:String
  },
  computed:{
    retroactionTentative () {
      return this.$store.state.retroactionTentative
    },
    resultats(){
      return this.$store.state.retroactionTentative.included ?? []
    },
    feedback_global(){
      return this.$store.state.retroactionTentative.attributes.feedback
    },
    testsPassent(){
      //verifie si tous les tests passent
      return this.$store.state.retroactionTentative.attributes.tests_réussis === this.$store.state.retroactionTentative.included.length
    },
    msgReponseApi(){
      return this.$store.state.msgAPIEnvoiTentative
    },
    envoiEnCours(){
      return this.$store.state.envoiTentativeEnCours
    }
  },
  methods: {
    validerTentative() {
      //TODO ne pas passer le langage en dur
      this.$store.dispatch('envoyerTentative', "python", this.code)
    }
  }
}
</script>