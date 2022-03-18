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
			if (timestamp == 0){
				return ""
			}
			return new Date(timestamp * 1000).toUTCString().substring(0,22);
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