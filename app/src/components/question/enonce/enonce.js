import parseMD from "@/util/parse";
import TabNav from "@/components/question/onglets/TabNav.vue"
import Tab from "@/components/question/onglets/Tab.vue"
import Rétroaction from "@/components/question/rétroactions/rétroaction.vue"

export default {
	name: "Enonce",
	components: { TabNav, Tab, Rétroaction },
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
			description: this.$store.state.question.description,
			aperçu: false,

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