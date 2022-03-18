import { useMeta } from 'vue-meta'

const API_URL = process.env.VUE_APP_API_URL;

export default {
	name: "TableauExercices",

	data() {

		return {

			uneListeAvancements: [],

			inputFilter: ''

		}

	},

	computed: {

		avancements() {
			return this.$store.state.user.avancements;
		},
		listeAvancements() {

			for (var avancement in this.avancements) {

				if (this.avancements[avancement].niveau == "base") {

					this.avancements[avancement].niveau = 1;
				} else if (this.avancements[avancement].niveau == "intermédiaire") {

					this.avancements[avancement].niveau = 2;
				} else if (this.avancements[avancement].niveau == "défi") {

					this.avancements[avancement].niveau = 3;
				}

				if (this.avancements[avancement].titre != "") {

					this.uneListeAvancements.push(this.avancements[avancement]);
				}
			}
		},
		filtreAvancement() {

			this.listeAvancements;

			return this.uneListeAvancements.filter((avancement) => {

				return avancement.titre.toLowerCase().includes(this.inputFilter.toLowerCase());

			});

		}
	},

	methods: {
		styleTh: function (id) {

			var element = document.getElementById(id);

			Array.from(document.getElementsByClassName("triTh")).forEach( className => {className.classList.remove("triTh")});

			if (id == "tglTitre") {

				element.classList.toggle("triTh");
			} else if (id == "tglNiveau") {

				element.classList.toggle("triTh");
			} else if (id == "tglDateM") {

				element.classList.toggle("triTh");
			} else if (id == "tglDateR") {

				element.classList.toggle("triTh");
			}
		},
		timestampVersDate: function (timestamp) {
			console.log(timestamp);
			if (timestamp == 0){
				return ""
			}
			return new Date(timestamp * 1000).toLocaleString("fr-CA");
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
					niveauString = "";
			}
			return niveauString;
		},
		allerVersQuestion: function (lien) {

			var avancementDivise = lien.split("/");
			var uri = avancementDivise[5];

			window.location.href = API_URL.replace(":9", ":8") + "/question?uri=" + uri;
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