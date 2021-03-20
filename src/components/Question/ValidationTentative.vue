<template class="p-4">
  <div
    v-if="msgReponseApi != null"
    class="alert alert-warning alert-dismissible fade show"
    role="alert"
  >
    <strong>{{ msgReponseApi }}</strong>
  </div>
  <div v-if="resultats.length >= 1" class="p-2">
    <h3 v-if="testsPassent != null && testsPassent">
      <span style="color:green">Bonne réponse</span> 👍
    </h3>
    <h3 v-else><span style="color:red">Mauvaise réponse</span> 😢</h3>
    <ul v-for="unResultat in resultats" :key="unResultat">
      <li>Résultat : {{ unResultat.attributes.résultat }}</li>
      <li>Sortie d'erreur : {{ unResultat.attributes.sortie_erreur }}</li>
      <li>Sortie observée : {{ unResultat.attributes.sortie_observée }}</li>
      <li>Rétroaction : {{ unResultat.attributes.feedback }}</li>
    </ul>
    <h4 v-if="feedback_global.length > 0">
      💡 Conseil : {{ feedback_global }}
    </h4>
  </div>
</template>
<script>
export default {
  //TODO integration avec le composant Test
  name: "ValidationTentative",
  props: {
    code: String,
    langage: String,
  },
  computed: {
    retroactionTentative() {
      return this.$store.state.retroactionTentative;
    },
    resultats() {
      return this.$store.state.retroactionTentative.included ?? [];
    },
    feedback_global() {
      return this.$store.state.retroactionTentative.attributes.feedback;
    },
    testsPassent() {
      //verifie si tous les tests passent
      return (
        this.$store.state.retroactionTentative.attributes.tests_réussis ===
        this.$store.state.retroactionTentative.included.length
      );
    },
    msgReponseApi() {
      return this.$store.state.msgAPIEnvoiTentative;
    },
    envoiEnCours() {
      return this.$store.state.envoiTentativeEnCours;
    },
  },
};
</script>
