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
		récupérerPourcentageRéussi : function (tentativesRéussies, langage){
			let totalRéussi = 0.0;
			let pourcentage = 0.0;
			for(let tentative in tentativesRéussies){
				totalRéussi += tentativesRéussies[tentative];
			}
			pourcentage = tentativesRéussies[langage] / totalRéussi * 100;
			return pourcentage.toFixed(1);
		}
	}
};
