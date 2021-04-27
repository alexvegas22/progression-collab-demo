import Test from "@/components/question/test/test.vue";
const diff = require("diff");

export default {
	components: { Test },
	name: "JeuTests",
	computed: {
		tests() {
			return this.$store.state.question.tests;
		},
		resultats() {
			return this.$store.state.retroactionTentative ? this.$store.state.retroactionTentative.resultats : [];
		},
	},
	data() {
		return {
			modeVisuel: false,
			modeDiff: false,
			resultatsModes: [],
			testsModes: [],
			prêt: false,
		};
	},
	mounted() {
		this.réinitialiserTableaux();
	},
	updated() {
		if (!this.resultats[0] && !this.prêt) {
			this.prêt = true;
			this.réinitialiserTableaux("résultats");
		}
	},
	watch: {
		modeVisuel: function(mode) {
			if (this.modeDiff && mode) {
				this.modeDiff = false;
			}
			this.changerModeComparaison();
		},
		modeDiff: function(mode) {
			if (this.modeVisuel && mode) {
				this.modeVisuel = false;
			}
			this.différence();
		},
		resultats: function() {
			this.réinitialiserTableaux("résultats");
		},
	},
	methods: {
		remplacerCaractèresVisuels(chaîne) {
			var chaîneTmp = undefined;
			if (!chaîne) {
				return;
			} else if (this.modeVisuel && chaîne.indexOf('<span class="modeVisuel">') > -1) {
				return chaîne;
			}

			chaîneTmp = chaîne.replaceAll(" ", '<span class="modeVisuel">_</span>');
			chaîneTmp = chaîneTmp.replaceAll("\n", '<span class="modeVisuel">↵\n</span>');
			chaîneTmp = chaîneTmp.replaceAll("\r", '<span class="modeVisuel">↵\n</span>');

			return chaîneTmp;
		},
		changerModeComparaison() {
			if (this.modeVisuel) {
				for (let i = 0; i < this.resultatsModes.length; i++) {
					this.resultatsModes[i].sortie_observée = this.remplacerCaractèresVisuels(
						this.resultatsModes[i].sortie_observée,
					);
					this.testsModes[i].sortie_attendue = this.remplacerCaractèresVisuels(this.testsModes[i].sortie_attendue);
				}
			} else {
				this.réinitialiserTableaux();
			}
		},
		différence() {
			if (this.modeDiff == false) {
				this.réinitialiserTableaux("résultats");
			} else {
				for (let i = 0; i < this.tests.length; i++) {
					if (!this.testsModes[i].sortie_attendue) {
						this.resultatsModes[i].sortie_observée = "";
					}
					const diffTmp = diff.diffChars(this.testsModes[i].sortie_attendue, this.resultatsModes[i].sortie_observée);
					var nouvelleSortieDiff = "";
					diffTmp.forEach(partie => {
						var span = undefined;
						if (partie.added) {
							span = `<span class="diff enlevé">${partie.value}</span>`;
						} else if (partie.removed) {
							span = `<span class="diff inséré">${partie.value}</span>`;
						} else {
							span = partie.value;
						}
						nouvelleSortieDiff += span;
					});
					this.resultatsModes[i].sortie_observée = nouvelleSortieDiff;
				}
			}
		},
		réinitialiserTableaux(tableau = "les deux") {
			switch (tableau) {
				case "tests":
					this.testsModes = [];
					this.réinitialiserTests();
					break;
				case ("resultats", "résultats"):
					this.resultatsModes = [];
					this.réinitialiserRésultats();
					break;
				default:
					this.testsModes = [];
					this.resultatsModes = [];
					this.réinitialiserTests();
					this.réinitialiserRésultats();
			}
		},
		réinitialiserTests() {
			this.tests.forEach(test => {
				this.testsModes.push({
					numéro: test.numéro,
					nom: test.nom,
					entrée: test.entrée,
					sortie_attendue: test.sortie_attendue,
					liens: {
						related: test.liens.related,
						self: test.liens.self,
					},
				});
			});
		},
		réinitialiserRésultats() {
			this.resultats.forEach(résultat => {
				this.resultatsModes.push({
					numéro: résultat.numéro,
					feedback: résultat.feedback,
					résultat: résultat.résultat,
					sortie_observée: résultat.sortie_observée,
					sortie_erreur: résultat.sortie_erreur,
					liens: {
						related: résultat.liens.related,
						self: résultat.liens.self,
					},
				});
			});
		},
	},
};
