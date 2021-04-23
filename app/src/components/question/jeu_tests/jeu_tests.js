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
			testsDiff: undefined,
			resultatsDiff: [],
		};
	},
	updated() {
		this.testsDiff = this.tests;
		this.resultatsDiff = this.resultats;
	},
	mounted() {
		this.testsDiff = this.tests;
	},
	watch: {
		modeVisuel: function(nouveauMode) {
			if (this.modeDiff && nouveauMode) {
				this.modeDiff = false;
			}
			this.changerModeComparaison();
		},
		modeDiff: function(nouveauMode) {
			if (this.modeVisuel && nouveauMode) {
				this.modeVisuel = false;
			}
			this.différence();
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

			if (this.modeVisuel) {
				chaîneTmp = chaîne.replaceAll(" ", '<span class="modeVisuel">_</span>');
				chaîneTmp = chaîneTmp.replaceAll("\n", '<span class="modeVisuel">↵\n</span>');
				chaîneTmp = chaîneTmp.replaceAll("\r", '<span class="modeVisuel">↵\n</span>');
			} else {
				chaîneTmp = chaîne.replaceAll('<span class="modeVisuel">_</span>', " ");
				chaîneTmp = chaîneTmp.replaceAll('<span class="modeVisuel">↵\n</span>', "\n");
			}

			return chaîneTmp;
		},
		changerModeComparaison() {
			this.testsDiff = this.tests;
			this.resultatsDiff = this.resultats;
			for (let i = 0; i < this.resultats.length; i++) {
				this.resultatsDiff[i].sortie_observée = this.remplacerCaractèresVisuels(this.resultatsDiff[i].sortie_observée);
				this.testsDiff[i].sortie_attendue = this.remplacerCaractèresVisuels(this.testsDiff[i].sortie_attendue);
			}
		},
		différence() {
			if (!this.resultatsDiff || !this.testsDiff || this.resultatsDiff.length === 0 || this.modeVisuel == true) {
				return;
			}

			this.testsDiff = this.tests;
			this.resultatsDiff = this.resultats;

			for (let i = 0; i < this.testsDiff.length; i++) {
				if (!this.testsDiff[i].sortie_attendue) {
					return this.testsDiff[i].sortie_attendue;
				}
				const diffTmp = diff.diffChars(this.tests[i].sortie_attendue, this.resultats[i].sortie_observée);
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
				this.resultatsDiff[i].sortie_observée = nouvelleSortieDiff;
			}
		},
	},
};
