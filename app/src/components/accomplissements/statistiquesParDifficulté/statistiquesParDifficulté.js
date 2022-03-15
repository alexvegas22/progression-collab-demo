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
		récupererPorcentageReussi : function (difficultésReussies, difficulté){
			var totalReussi = null;
			var porcentage = 50.0;
			/*for(var tentative in tentativesReussi){
				totalReussi = totalReussi + tentativesReussi[tentative];
			}
			porcentage = (100 / totalReussi) * tentativesReussi[langage];*/
			return porcentage.toFixed(2);
		}
	}
};