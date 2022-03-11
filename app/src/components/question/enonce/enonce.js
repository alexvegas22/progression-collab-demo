import parseMD from "@/util/parse";

export default {
	name: "Enonce",
	computed: {
		modeÉdition() {
			return this.$store.state.mode_édition;
		},
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
		niveaux() {
			return ['base', 'débutant', 'intermédiaire', 'avancé'];
		},
	},
	methods: {
		basculerBtnAperçu() {
			var btnAperçu = document.getElementById("btn_aperçu");
			btnAperçu.innerHTML == "Modifier ✎" ? btnAperçu.innerHTML = "Aperçu 👁" : btnAperçu.innerHTML = "Modifier ✎";
		},
		modifierContenu(évènement, indice) {
			this.contenu[indice].texte = évènement.target.innerText;
		},
		modifierNiveau(niveau) {
			this.contenu[0].texte = niveau;
		}
	},

	data() {
		return {
			contenu:
				[
					{ texte: this.$store.state.question.niveau },
					{ texte: this.$store.state.question.titre },
					{ texte: this.$store.state.question.auteur },
					{ texte: this.$store.state.question.licence }
				]
			,
			énoncé: this.$store.state.question.énoncé,
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
