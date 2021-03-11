<template class="p-4">
  <div v-if="message_connexion_API!=null" class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>{{message_connexion_API}}</strong>
  </div>

  <div  v-if="resultats.length>=1" >
    <button type="button" class="btn btn-lg btn-primary" :disabled="message_connexion_API===msg_attente_reponse_API" @click="validerTentative">envoie ta reponse</button>
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
//import { envoyerTentative } from '@/util/solution';

export default {
  name: "ValidationTentative",
  data: () => ({
    msg_attente_reponse_API:"Envoie de la tentative en cours...",
    message_connexion_API:null,
    resultats:Array,
    feedback_global:"",
    testsPassent:null
  }),
  props: {
    code:String,
    langage:String
  },
  computed:{
    retroactionTentative () {
      return this.$store.state.retroactionTentative
    }
  },
  methods: {
    async validerTentative() {
      //TODO ne pas passer le langauge en dur
      await this.$store.dispatch('envoyerTentative', "python", this.code)

      this.resultats=this.retroactionTentative.included
      this.feedback_global=this.retroactionTentative.attributes.feedback

      //verifie si tous les tests passent
      this.testsPassent = this.retroactionTentative.attributes.tests_réussis === this.resultats.length;

      /*this.message_connexion_API=this.msg_attente_reponse_API
      envoyerTentative(this.langage, this.code).then(
          reponseAPI => {
            //si on recoit une reponse le message devient null, la reponse sera affichee
            this.message_connexion_API="";
            this.resultats = reponseAPI.data.included
            this.feedback_global = reponseAPI.data.attributes.feedback

            //verifie si tous les tests passent
            this.testsPassent = reponseAPI.data.attributes.tests_réussis === this.resultats.length;

          }
      ).catch(
          err => {
            console.log(err);
            //message d'erreur si on ne peut pas joindre l'API
            this.message_connexion_API="Impossible de communiquer avec le super serveur de validation :("
          }
      )*/
    }
  }
}
</script>