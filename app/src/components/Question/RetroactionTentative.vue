<template class="p-4">
	<div v-if="msgReponseApi != null" class="alert alert-warning alert-dismissible fade show" role="alert">
		<strong>{{ msgReponseApi }}</strong>
	</div>
	<div v-if="!tentativeEnCoursDeSoumission && msgReponseApi == null" class="p-2">
		<h3 v-if="testsPassent"><span style="color: green">Bonne réponse</span> 👍</h3>
		&nbsp;
		<h3 v-else><span style="color: red">Mauvaise réponse</span> 😢</h3>
		&nbsp;
		<h4>
			💡 Nombre de tests validés :
			<span style="color: green">
				<strong>{{ nbTestsReussis }} </strong>
			</span>
		</h4>
		&nbsp;
		<h4 v-if="feedback_global">
			💡 Conseil : <span style="color: orange">{{ feedback_global }}</span>
		</h4>
	</div>
</template>

<script>
export default {
	name: "RetroactionTentative",
	computed: {
		retroactionTentative() {
			return this.$store.state.retroactionTentative;
		},
		resultats() {
			return this.retroactionTentative.resultats ?? [];
		},
		feedback_global() {
			return this.retroactionTentative.feedback;
		},
		testsPassent() {
			return this.retroactionTentative.réussi;
		},
		nbTestsReussis() {
			return this.retroactionTentative.tests_réussis;
		},
		msgReponseApi() {
			return this.$store.state.msgAPIEnvoiTentative;
		},
		tentativeEnCoursDeSoumission() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
};
</script>
