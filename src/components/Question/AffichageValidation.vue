<template>
    <h2>Jexiste!</h2>
    <ul v-for="unResultat in résultats" :key="unResultat">
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

    <h4 v-if="feedback_global">Feedback global: {{feedback_global}}</h4>

    <h3 v-if="testsPassent!=null">Ta reponse est {{testsPassent ? "Bonne" : "Mauvaise" }}</h3>
</template>
<script>
export default {
  name: "AffichageValidation",
  props: {
    résultats:Array,
    feedback_global:String,
    testsPassent:Boolean
  }
}
</script>