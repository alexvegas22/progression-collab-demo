import parseMD from "@/util/parse";
import TabNav from "./TabNav.vue"
import Tab from "./Tab.vue"

export default {
	name: "Enonce",
	components: { TabNav, Tab },
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
		},
		modifierContenu(e, indice) {
			this.contenu[indice].texte = e.target.innerText;
		},
		setSelected(tab) {
			this.selected = tab;
		}
	},

	data() {

		return {
			selected: 'Énoncé',
			contenu:
				[
					{ texte: this.$store.state.question.niveau },
					{ texte: this.$store.state.question.titre },
					{ texte: this.$store.state.question.auteur },
					{ texte: this.$store.state.question.licence }
				]
			,
			énoncé: this.$store.state.question.énoncé,
			positive: this.$store.state.question.feedback.positive,
			négative: this.$store.state.question.feedback.négative,
			erreur: this.$store.state.question.feedback.erreur,
			description: this.$store.state.question.description,
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