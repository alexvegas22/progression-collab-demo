export default {
	name: "Avancement",
	computed: {
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
		timestampVersDate: function (timestamp) {
			return new Date(timestamp * 1000).toLocaleString("fr-CA");
		},
		étatVersChaîne: function (etat) {
			let etatString;
			switch (etat) {
				case 0:
					etatString = "premièreTentative";
					break;
				case 1:
					etatString = "questionNonRésolue";
					break;
				case 2:
					etatString = "questionRésolue";
					break;
				default:
					etatString = "questionIndéterminée";
			}
			return etatString;
		},
	},
};
