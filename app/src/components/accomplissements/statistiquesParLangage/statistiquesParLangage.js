export default {
	name: "statistiquesParLangage",

	computed: {

		user() {
			return this.$store.state.user;
		},
		tentativesRéussies() {
			return this.$store.state.tentativesRéussies;
		},
	},

	mounted() {
		return this.$store
			.dispatch("getTentativesRéussies", {
				url: this.user.liens.self,
			})
	},
	methods: {
		récupérerPourcentageRéussi: function (tentativesReussi, langage) {
			var totalReussi = null;
			var porcentage = 0.0;
			for (var tentative in tentativesReussi) {
				totalReussi = totalReussi + tentativesReussi[tentative];
			}
			porcentage = (100 / totalReussi) * tentativesReussi[langage];
			return porcentage.toFixed(1);
		},
		récupérerLangage: function(tentativesReussi){
			let keys = Object.keys(tentativesReussi)
			let arrayLength = keys.length
			let listeLangage = []
			for(let i = 0; i < arrayLength; i++){
				let pourcentage = this.récupérerPourcentageRéussi(tentativesReussi, keys[i]);
				listeLangage.push([keys[i], pourcentage])
				console.log(listeLangage)
			}
			return listeLangage
			
		}
	}
};