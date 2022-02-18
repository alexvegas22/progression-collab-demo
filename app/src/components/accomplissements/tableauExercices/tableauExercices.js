export default {
	name: "TableauExercices",

	computed: {
		langage() {
			return this.$store.state.tentative ? this.$store.state.tentative.langage : null;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives ?? [];
		},
		niveau(){
			return this.$store.state.question.niveau;
		},
		titre(){
			return this.$store.state.question.titre;
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
					etatString = "questionRésolue";
					break;
				default:
					etatString = "questionNonRésolue";
			}
			return etatString;
		},
		redirigerVersLogin(ref) {
			this.$router.push({
				name: "LoginView",
				params: {
					ref: ref,
				},
			});
		},
	},
};