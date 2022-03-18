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
		récupérerPourcentageRéussi: function (langage) {
			let totalRéussi = 0.0;
			let pourcentage = 0.0;
			for (let tentative in this.tentativesRéussies) {
				totalRéussi += this.tentativesRéussies[tentative];
			}
			pourcentage = this.tentativesRéussies[langage] / totalRéussi * 100;
			return pourcentage.toFixed(1);
		},
		récupérerRéussi: function () {
			let keys = Object.keys(this.tentativesRéussies)
			let listeRéussi = []
			for (let i = 0; i < keys.length; i++) {
				let pourcentage = this.récupérerPourcentageRéussi(keys[i]);
				listeRéussi.push([keys[i], pourcentage])
			}
			return listeRéussi;
		}
	}
};
