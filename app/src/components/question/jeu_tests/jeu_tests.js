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
	props: {
		testsDiff: undefined,
	},
	data() {
		return {
			modeVisuel: false,
		};
	},
	updated() {
		this.changerModeComparaison();
		this.différence();
	},
	methods: {
		remplacerCaractèresVisuels(chaîne) {
			if (!chaîne) {
				return;
			} else if (this.modeVisuel && chaîne.indexOf('<span class="modeVisuel">') > -1) {
				return chaîne;
			}

			if (this.modeVisuel) {
				chaîne = chaîne.replaceAll(" ", '<span class="modeVisuel">_</span>');
				chaîne = chaîne.replaceAll("\n", '<span class="modeVisuel">↵\n</span>');
				chaîne = chaîne.replaceAll("\r", '<span class="modeVisuel">↵\n</span>');
			} else {
				chaîne = chaîne.replaceAll('<span class="modeVisuel">_</span>', " ");
				chaîne = chaîne.replaceAll('<span class="modeVisuel">↵\n</span>', "\n");
			}

			return chaîne;
		},
		changerModeComparaison() {
			for (let i = 0; i < this.resultats.length; i++) {
				this.resultats[i].sortie_observée = this.remplacerCaractèresVisuels(this.resultats[i].sortie_observée);
				this.tests[i].sortie_attendue = this.remplacerCaractèresVisuels(this.tests[i].sortie_attendue);
			}
		},
		différence() {
			for (let i = 0; i < this.tests.length; i++) {
				if (!this.resultats[i].sortie_observée || !this.tests[i].sortie_attendue) {
					return;
				}
				const diffTmp = diff.diffChars(this.resultats[i].sortie_observée, this.tests[i].sortie_attendue);
				var nouvelleSortieDiff = "";
				diffTmp.forEach(partie => {
					var span = undefined;
					if (partie.added) {
						span = `<span class="diff inséré">${partie.value}</span>`;
					} else if (partie.removed) {
						span = `<span class="diff enlevé">${partie.value}</span>`;
					} else {
						span = partie.value;
					}
					nouvelleSortieDiff += span;
				});
				this.tests[i].sortie_attendue = nouvelleSortieDiff;
			}
		},
	},
};
