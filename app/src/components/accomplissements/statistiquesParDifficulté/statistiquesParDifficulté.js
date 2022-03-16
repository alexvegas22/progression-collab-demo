export default {
	name: "statistiquesParDifficulté",

	computed: {

		user() {
			return this.$store.state.user;
		},
		difficultésReussies() {
			return this.$store.state.difficultésReussies;
		},
	},

	mounted() {
		return this.$store
			.dispatch("getDifficultésRéussies", {
				url: this.user.liens.self,
			})
	},
	methods: {
		récupererPorcentageReussi: function (difficultésReussies, niveauDifficulté) {
			var totalReussi = null;
			var porcentage = 0.0;
			for (var difficulté in difficultésReussies) {
				totalReussi = totalReussi + difficultésReussies[difficulté];
			}
			porcentage = (100 / totalReussi) * difficultésReussies[niveauDifficulté];
			return porcentage.toFixed(2);
		}
	}
};