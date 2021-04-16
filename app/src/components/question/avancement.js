export default {
	name: "Avancement",
	computed: {
		avancement() {
			return this.$store.state.avancement;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives;
		},
		selected() {
			if (this.tentatives.length > 0){
				return this.tentatives[0].date_soumission;
			}
			else{
				return "";
			}
		}
	},
	methods: {
		chargerTentative: function (lien) {
			this.$store.dispatch("getTentative", lien);
		},
		convetirDateDepuisTimeStamp: function (timestamp) {
			let date = new Date(timestamp * 1000);
			return date.toLocaleString("fr-CA");
		},
		convetirEtatEnString: function (etat) {
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
