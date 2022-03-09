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
		}
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
		dropdown() {
			var x = document.getElementById("Demo");
			if (x.className.indexOf("w3-show") == -1) {
				x.className += " w3-show";
			}
			else {
				this.quitter();
			}
		},
		quitter() {
			var x = document.getElementById("Demo");
			x.className = x.className.replace(" w3-show", "");
		},
		dropdownChoix(choix) {
			this.contenu[0].texte = choix;
			this.quitter();
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
			count: 0,

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
