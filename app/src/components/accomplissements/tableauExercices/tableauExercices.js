
const API_URL = process.env.VUE_APP_API_URL;

export default {
	name: "TableauExercices",
	
	computed: {
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
		allerQuestion(lien){

			var avancementDivise = lien.split("/");
			var uri = avancementDivise[5];

			window.location.href = API_URL.replace(":9",":8") + "/question?uri=" + uri;
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

			console.log(this.avancements);
		},
		ordreReussite: function (){
			
			if (this.estCroissant(this.listeAvancements[0].date_réussite,this.listeAvancements[1].date_réussite)){

				this.listeAvancements.sort((a,b)=>{return b.date_réussite - a.date_réussite;});
			}
			else{
				this.listeAvancements.sort((a,b)=>{return a.date_réussite - b.date_réussite;});
			}
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