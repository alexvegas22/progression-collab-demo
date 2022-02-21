export default {
	name: "TableauExercices",

	computed: {
		tentative() {
			return this.$store.state.tentative;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives;
		},
		niveau(){
			return this.$store.state.question.niveau;
		},
		user(){
			return this.$store.state.user;
		},
		avancements(){
			return this.$store.state.user.avancements;
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
				case 2:
					etatString = "Réussi !!";
					break;
				default:
					etatString = "En cours";
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