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
			return this.$store.state.user.liens.self + "?include=tentatives";
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
			if (timestamp == 0){
				return "Pas encore réussi"
			}
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
		ordreModification: function (){
			//Array.from(this.avancements).sort((a,b)=>{return a.date_modification - b.date_modification;});
			//console.log(Array.from(this.avancements).sort((a,b)=>{return a.date_modification - b.date_modification;}));
			console.log(this.avancements);
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