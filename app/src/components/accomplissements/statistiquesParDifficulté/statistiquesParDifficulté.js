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
		récupérerPourcentageRéussi: function (difficultésReussies, niveauDifficulté) {
			var totalReussi = null;
			var porcentage = 0.0;
			for (var difficulté in difficultésReussies) {
				totalReussi = totalReussi + difficultésReussies[difficulté];
			}
			porcentage = (100 / totalReussi) * difficultésReussies[niveauDifficulté];
			return porcentage.toFixed(1);
		},
		récupérerDifficulté: function(difficultésReussies){
			let keys = Object.keys(difficultésReussies)
			let arrayLength = keys.length
			let listeDifficultés = []
			for(let i = 0; i < arrayLength; i++){
				let pourcentage = this.récupérerPourcentageRéussi(difficultésReussies, keys[i]);
				listeDifficultés.push([keys[i], pourcentage])
			}
			return listeDifficultés
			
		}
	}
};