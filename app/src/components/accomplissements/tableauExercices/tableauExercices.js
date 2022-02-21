export default {
	name: "TableauExercices",

	computed: {
		niveau(){
			return this.$store.state.question.niveau;
		},
		user(){
			return this.$store.state.user;
		},
		avancements(){
			return this.$store.state.user.avancements;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives ?? [];
		},
		tentative() {
			return this.$store.state.tentative;
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
		etat: function (etat) {
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