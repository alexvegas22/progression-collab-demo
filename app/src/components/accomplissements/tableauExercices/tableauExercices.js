
const API_URL = process.env.VUE_APP_API_URL;

export default {
	name: "TableauExercices",

	data(){

		return{

			uneListeAvancements: [],

			inputFilter: ''

		}

	},

	computed: {

		avancements(){
			return this.$store.state.user.avancements;
		},
		listeAvancements(){

			var listeAvancements = [];

			for(var avancement in this.avancements){
				
				if (this.avancements[avancement].niveau == "base"){

					this.avancements[avancement].niveau = 1;
				} else if (this.avancements[avancement].niveau == "intermédiaire"){

					this.avancements[avancement].niveau = 2;
				} else if (this.avancements[avancement].niveau == "défi"){

					this.avancements[avancement].niveau = 3;
				}

				listeAvancements.push(this.avancements[avancement]);
				console.log(this.avancements[avancement].niveau);
			}

			return listeAvancements;
		},
		filtreAvancement(){

            this.uneListeAvancements = this.listeAvancements;




            return this.uneListeAvancements.filter((avancement) => {

                return avancement.titre.toLowerCase().includes(this.inputFilter.toLowerCase());

            });

        }
	},

	methods: {
		timestampVersDate: function (timestamp) {
			if (timestamp == 0){
				return "Pas encore réussi"
			}
			return new Date(timestamp * 1000).toLocaleString("fr-CA");
		},
		afficherEtat: function (etat) {
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
		afficherNiveau: function (niveau) {

			let niveauString;
			switch (niveau) {
				case 1:
					niveauString = "Base";
					break;
				case 2:
					niveauString = "Intermédiaire";
					break;
				case 3:
					niveauString = "Défi";
					break;
				default:
					niveauString = "Inconnu";
			}
			return niveauString;
		},
		allerVersQuestion: function (lien){

			var avancementDivise = lien.split("/");
			var uri = avancementDivise[5];

			window.location.href = API_URL.replace(":9",":8") + "/question?uri=" + uri;
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