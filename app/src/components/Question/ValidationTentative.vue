<template class="p-4">
	<div v-if="msgReponseApi != null" class="alert alert-warning alert-dismissible fade show" role="alert">
		<strong>{{ msgReponseApi }}</strong>
	</div>
	<!--div v-if="resultats.length > 0" class="p-2"-->
	<div class="p-2">
		<h3 v-if="testsPassent"><span style="color: green">Bonne réponse</span> 👍</h3>
		<h3 v-else><span style="color: red">Mauvaise réponse</span> 😢</h3>
		<!--ul v-for="unResultat in resultats" :key="unResultat">
      <li>Résultat : {{ unResultat.résultat }}</li>
      <li>Sortie d'erreur : {{ unResultat.sortie_erreur }}</li>
      <li>Sortie observée : {{ unResultat.sortie_observée }}</li>
      <li>Rétroaction : {{ unResultat.feedback }}</li>
    </ul-->
		<h4 v-if="feedback_global">💡 Conseil : {{ feedback_global }}</h4>
	</div>
</template>

<script>
export default {
	name: "ValidationTentative",
	computed: {
		retroactionTentative() {
			return this.$store.state.retroactionTentative
		},
		/*resultats() {
      return this.retroactionTentative.resultats ?? []
    },*/
		feedback_global() {
			return this.retroactionTentative.feedback_global
		},
		// Vérifie si tous les tests passent en comparant la valeur de l'attribut «tests_reussis» avec le nombre de tests associés la question
		testsPassent() {
			if (this.retroactionTentative.resultats) {
				return this.retroactionTentative.tests_réussis === this.retroactionTentative.resultats.length
			}else{
        return false
      }
		},
		msgReponseApi() {
			return this.$store.state.msgAPIEnvoiTentative
		},
	},
};
</script>
