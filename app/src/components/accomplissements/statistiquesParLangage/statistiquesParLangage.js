export default {
	name: "statistiquesParLangage",
	computed: {
		user() {
			return this.$store.state.user;
		},
		nbRéussitesParLangage() {
			return this.$store.state.nbRéussitesParLangage;
		},
	},
	mounted() {
		return this.$store
			.dispatch("getNbRéussitesParLangage", {
				url: this.user.liens.self,
			});
	},
	methods: {
		récupérerPourcentageRéussi: function (langageAttendu) {
			let totalRéussi = 0.0;
			let pourcentage = 0.0;
			for (let langage in this.nbRéussitesParLangage) {
				totalRéussi += this.nbRéussitesParLangage[langage];
			}
			pourcentage = this.nbRéussitesParLangage[langageAttendu] / totalRéussi * 100;
			return pourcentage.toFixed(1);
		},
		récupérerRéussi: function () {
			let langages = Object.keys(this.nbRéussitesParLangage);
			let listeRéussi = [];
			for (let langage in langages) {
				let pourcentage = this.récupérerPourcentageRéussi(langage);
				listeRéussi.push([langage, pourcentage]);
			}
			return listeRéussi;
		}
	}
};
