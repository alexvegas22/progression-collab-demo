export default {
	name: "Avancement",
	computed: {
		avancement() {
			return this.$store.state.avancement;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives;
		},
		langages() {
			return Object.keys(this.$store.state.question.ebauches);
		},
	},
	methods: {
		filtrerTentativesParLangage: function (langage) {
			return this.tentatives.filter((item) => item.langage == langage);
		},
		chargerTentative: function (lien) {
			this.$store.dispatch("getTentative", lien);
		},
		convetirDateDepuisTimeStamp: function (timestamp) {
			return new Date(timestamp * 1000).toLocaleString("fr-CA");
		},
		convetirEtatEnString: function (etat) {
			let etatString;
			switch (etat) {
				case 0:
					etatString = "Vous en êtes à votre première tentative !";
					break;
				case 1:
					etatString = "La question n'a pas encore été résolue !";
					break;
				case 2:
					etatString = "La question a déjà été correctement résolue !";
					break;
				default:
					etatString = "La question est indéterminée !";
			}
			return etatString;
		},
	},
};
