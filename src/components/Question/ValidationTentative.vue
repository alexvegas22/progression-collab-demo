<template>
  <h3 v-if="message_connexion_API!=null" >{{message_connexion_API}}</h3>
  <div v-if="resultats.length>=1" >
    <button :disabled="message_connexion_API===msg_attente_reponse_API" @click="valider_tentative">envoie ta reponse</button>
    <ul v-for="unResultat in resultats" :key="unResultat">
      <li>
        resultat: {{unResultat.résultat}}
      </li>
      <li>
        sortie d'erreur: {{unResultat.sortie_erreur}}
      </li>
      <li>
        sortie observée: {{unResultat.sortie_observée}}
      </li>
      <li>
        feedback: {{unResultat.feedback}}
      </li>
    </ul>

    <h4 v-if="feedback_global.length>0">Feedback global: {{feedback_global}}</h4>
    <h3 v-if="testsPassent!=null">Ta reponse est {{testsPassent ? "Bonne" : "Mauvaise" }}</h3>
  </div>

</template>
<script>
import { envoyerTentative } from '@/util/solution';
export default {
  name: "ValidationTentative",
  data: () => ({
    msg_attente_reponse_API:"Envoie de la tentative en cours...",
    message_connexion_API:"",
    resultats:Array,
    feedback_global:"",
    testsPassent:null
  }),
  props: {
    code:String,
    langage:String
  },
  methods: {
    valider_tentative() {
      this.message_connexion_API=this.msg_attente_reponse_API
      envoyerTentative(this.langage, this.code).then(
          tentative => {
            //si on recoit une reponse le message devient null, la reponse sera affichee
            this.message_connexion_API="";
            this.resultats = tentative.résultats
            this.feedback_global = tentative.feedback

            //variable qui sera a false si ce ne sont pas tous les tests qui passent
            this.testsPassent = true;

            //on itère à travers tous les tests pour voir s'il y en a un qui ne passent pas.
            for(let unResultat of tentative.résultats){
              if(unResultat.résultat === "false") {
                this.testsPassent = false;
                break;
              }
            }
          }
      ).catch(
          err => {
            console.log(err);
            //message d'erreur si on ne peut pas joindre l'API
            this.message_connexion_API="Impossible de communiquer avec le super serveur de validation :("
          }
      )
    }
  }
}
</script>