<template>
	<button
		type="button"
		class="btn btn-success btn-valider p-3"
		style="margin-top: 15px; width: 100%"
		:disabled="envoiEnCours"
		@click="validerTentative"
	>
		Valider
	</button>
</template>

<script>
export default {
	name: "ValidationTentative",
	props: ["uri", "username"],
	components: {},
	methods: {
		validerTentative() {
			this.$store.dispatch("soumettreTentative", {
				langage: this.$store.state.langageTentative,
				code: this.$store.state.codeTentative,
				username: this.username,
				uri: this.uri,
			});
		},
	},
	computed: {
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
};
</script>

<style>
.btn-valider {
	box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}
</style>
