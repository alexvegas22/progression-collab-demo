import parseMD from "@/util/parse";
import TabNav from "@/components/question/onglets/TabNav.vue";
import Tab from "@/components/question/onglets/Tab.vue";
import Rétroaction from "@/components/question/rétroactions/rétroaction.vue";

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
		feedbacks_label() {
			return Object.keys(this.$store.state.question.feedback);
		},
		feedbacks_valeur() {
			return Object.values(this.$store.state.question.feedback);
		},
	},
	methods: {
		basculeBoutonAperçu() {
			var element = document.getElementById("btn_aperçu").innerHTML;
			if (element == "Modifier ✎") {
				document.getElementById("btn_aperçu").innerHTML = "Aperçu 👁";
			} else {
				document.getElementById("btn_aperçu").innerHTML = "Modifier ✎";
			}
		},
		modifierContenu(e, indice) {
			this.contenu[indice].texte = e.target.innerText;
			switch (indice) {
				case 0:
					this.$store.state.question.niveau = this.contenu[indice].texte;
				case 1:
					this.$store.state.question.titre = this.contenu[indice].texte;
				case 2:
					this.$store.state.question.auteur = this.contenu[indice].texte;
				case 3:
					this.$store.state.question.licence = this.contenu[indice].texte;
			}
		},
		setSelected(tab) {
			this.selected = tab;
		},
		feedback_select: function (index) {
			let feedback = this.$store.state.question.feedback;
			switch (index) {
				case 0:
					if (feedback.positive == null) {
						this.$store.state.question.feedback.positive = "";
					}
				case 1:
					if (feedback.négative == null) {
						this.$store.state.question.feedback.négative = "";
					}
				case 2:
					if (feedback.erreur == null) {
						this.$store.state.question.feedback.erreur = "";
					}
			}
			return this.feedbacks_valeur[index] != null ? this.feedbacks_valeur[index] : "";
		},
		modifierÉnoncé(){
			this.$store.state.question.énoncé = this.énoncé;
		},
		modifierDescription(){
			this.$store.state.question.description = this.description;
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
