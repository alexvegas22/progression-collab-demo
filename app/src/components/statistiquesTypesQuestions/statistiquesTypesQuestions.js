export default {
	name: "statisiqueTypesQuestions",

	computed: {

		user(){
			return this.$store.state.user;
		},
		avancements(){
			return this.$store.state.user.avancements;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives ?? [];
		},
		date_soumission() {
			return this.$store.state.tentative.date_soumission;
		},
		question_uri(){
			return this.$store.dispatch("getQuestion", API_URL + "/question/" + this.uri);
		},
	},

	methods: {
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