export default {
	name: "statistiquesParDifficulté",
	computed: {
		user() {
			return this.$store.state.user;
		},
		difficultésRéussies() {
			return this.$store.state.difficultésRéussies;
		},
	},
	mounted() {
		return this.$store
			.dispatch("getDifficultésRéussies", {
				url: this.user.liens.self,
			});
	},
};