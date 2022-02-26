import parseMD from "@/util/parse";

export default {
	name: "Enonce",
	computed: {
		état_réussi() {
			return this.$store.state.avancement.état == 2;
		},
		question() {
			return new Proxy(this.$store.state.question, {
				get: function (obj, prop) {
					return prop == "énoncé" ? parseMD(obj[prop]) : obj[prop];
				},
			});
		},
	},
	methods: {
		cacher() {
			var element = document.getElementById("btn_aperçu").innerHTML;
			if (element == "Modifier ✎") {
				document.getElementById("btn_aperçu").innerHTML = "Aperçu 👁";
			} else {
				document.getElementById("btn_aperçu").innerHTML = "Modifier ✎";
			}

		}
	},

	data() {

		return {
			énoncé: this.$store.state.question.énoncé,
			count: 0,
			titre: this.$store.state.question.titre,
			niveau: this.$store.state.question.niveau,
			auteur: this.$store.state.question.auteur,
			licence: this.$store.state.question.licence,
			aperçu: false,
			retropos: this.$store.state.question.feedback.positive,
			retroneg: this.$store.state.question.feedback.négative,
			retroerr: this.$store.state.question.feedback.erreur,

			toolbar: {
				documentation: {
					title: 'Documentation Markdown',
					icon: 'v-md-icon-tip',
					action() {
						window.open('https://www.markdownguide.org/cheat-sheet', '_blank');
					}
				}
			}
		};
	},
};