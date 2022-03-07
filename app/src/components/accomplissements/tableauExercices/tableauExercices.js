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
		listeAvancements(){

			var listeAvancements = [];

			for(var avancement in this.avancements){

				listeAvancements.push(this.avancements[avancement]);
			}

			return listeAvancements;
		},
		tentatives() {
			return this.$store.state.user.liens.self + "?include=tentatives";
		},
		date_soumission() {
			return this.$store.state.tentative.date_soumission;
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
		allerQuestion(uri){

			console.log("/question?uri=" + uri);
		},
		estCroissant(info1, info2){
			if (info1 < info2){
				return true;
			}

			return false;
		},
		ordreModification: function (){

			if (this.estCroissant(this.listeAvancements[0].date_modification,this.listeAvancements[1].date_modification)){

				this.listeAvancements.sort((a,b)=>{return b.date_modification - a.date_modification;});
			}
			else{
				this.listeAvancements.sort((a,b)=>{return a.date_modification - b.date_modification;});
			}

			console.log(this.listeAvancements[0].date_modification);
		},
		ordreReussite: function (){
			
			this.listeAvancements.sort((a,b)=>{return b.date_réussite - a.date_réussite;});
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