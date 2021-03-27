<template class="p-4">
  <div
    v-if="msgReponseApi != null"
    class="alert alert-warning alert-dismissible fade show"
    role="alert"
  >
    <strong>{{ msgReponseApi }}</strong>
  </div>
  <div v-if="resultats.length > 0" class="p-2">
    <h3 v-if="testsPassent">
      <span style="color:green">Bonne réponse</span> 👍
    </h3>
    <h3 v-else><span style="color:red">Mauvaise réponse</span> 😢</h3>
    <ul v-for="unResultat in resultats" :key="unResultat">
      <li>Résultat : {{ unResultat.attributes.résultat }}</li>
      <li>Sortie d'erreur : {{ unResultat.attributes.sortie_erreur }}</li>
      <li>Sortie observée : {{ unResultat.attributes.sortie_observée }}</li>
      <li>Rétroaction : {{ unResultat.attributes.feedback }}</li>
    </ul>
    <h4 v-if="feedback_global">
      💡 Conseil : {{ feedback_global }}
    </h4>
  </div>
</template>

<script>
export default {
  name: "ValidationTentative",
  computed: {
    retroactionTentative() {
      return this.$store.state.retroactionTentative;
    },
    resultats() {
      return this.retroactionTentative.included ?? []
    },
    feedback_global() {
      return this.retroactionTentative.attributes.feedback;
    },
    // Vérifie si tous les tests passent en comparant la valeur de l'attribut «tests_reussis» avec le nombre de tests associés la question
    testsPassent() {
      return (
        this.retroactionTentative.attributes.tests_réussis === this.retroactionTentative.included.length
      );
    },
    msgReponseApi() {
      return this.$store.state.msgAPIEnvoiTentative;
    },
  },
};
</script>
