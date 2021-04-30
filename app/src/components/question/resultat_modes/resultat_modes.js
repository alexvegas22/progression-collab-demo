const diff = require("diff");

export default {
	name: "ResultatModes",
	props: {
		mode: null,
	},
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
			modeBtn: undefined,
			resultatsCopie: undefined,
			testsCopie: undefined,
			resultatsModeVisuel: undefined,
			testsModeVisuel: undefined,
			resultatsModeDiff: undefined,
			testsModeDiff: undefined,
		};
	},
	mounted() {
		this.testsCopie = this.copierTests(this.tests, this.testsCopie);
		this.resultatsCopie = this.copierResultats(this.resultats, this.resultatsCopie);
	},
	watch: {
		modeBtn: function(mode) {
			if (!this.testsCopie || this.testsCopie.length == 0) {
				this.testsCopie = this.copierTests(this.tests, this.testsCopie);
			}
			if (!this.resultatsCopie || this.resultatsCopie.length == 0) {
				this.resultatsCopie = this.copierResultats(this.resultats, this.resultatsCopie);
			}

			this.réinitialiserListesOriginales();

			switch (mode) {
				case "visuel":
					this.mode.normal = false;
					this.mode.visuel = true;
					this.mode.diff = false;
					this.changerModeComparaison();
					this.copierResultats(this.resultatsModeVisuel, this.resultats);
					this.copierTests(this.testsModeVisuel, this.tests);
					break;
				case "diff":
					this.mode.normal = false;
					this.mode.visuel = false;
					this.mode.diff = true;
					this.différence();
					this.copierResultats(this.resultatsModeDiff, this.resultats);
					this.copierTests(this.testsModeDiff, this.tests);
					break;
				default:
					this.mode.normal = true;
					this.mode.visuel = false;
					this.mode.diff = false;
			}
		},
	},
	methods: {
		remplacerCaractèresVisuels(chaîne) {
			if (!chaîne) {
				return "";
			}

			var chaîneTmp = undefined;

			chaîneTmp = chaîne.replaceAll(" ", '<span class="modeVisuel">_</span>');
			chaîneTmp = chaîneTmp.replaceAll("\n", '<span class="modeVisuel">↵\n</span>');

			return chaîneTmp;
		},
		changerModeComparaison() {
			if (!this.resultatsModeVisuel || !this.testsModeVisuel) {
				this.resultatsModeVisuel = new Array(this.resultats.length);
				this.testsModeVisuel = new Array(this.tests.length);
				this.resultatsModeVisuel = this.copierResultats(this.resultatsCopie, this.resultatsModeVisuel);
				this.testsModeVisuel = this.copierTests(this.testsCopie, this.testsModeVisuel);
				for (let i = 0; i < this.resultatsModeVisuel.length; i++) {
					this.resultatsModeVisuel[i].sortie_observée = this.remplacerCaractèresVisuels(
						this.resultats[i].sortie_observée,
					);
					this.testsModeVisuel[i].sortie_attendue = this.remplacerCaractèresVisuels(this.tests[i].sortie_attendue);
				}
			}
		},
		différence() {
			if (!this.resultatsModeDiff || !this.testsModeDiff) {
				this.resultatsModeDiff = new Array(this.resultats.length);
				this.testsModeDiff = new Array(this.tests.length);
				this.resultatsModeDiff = this.copierResultats(this.resultatsCopie, this.resultatsModeDiff);
				this.testsModeDiff = this.copierTests(this.testsCopie, this.testsModeDiff);
				for (let i = 0; i < this.testsModeDiff.length; i++) {
					if (!this.testsModeDiff[i].sortie_attendue) {
						return;
					}

					const différences = diff.diffChars(
						this.testsModeDiff[i].sortie_attendue,
						this.resultatsModeDiff[i].sortie_observée,
					);

					var nouvelleSortieDiffRes = "";
					var nouvelleSortieDiffTes = "";
					var spanResTmpAjouté = "";
					var spanTesTmpEnlevé = "";

					for (let i = 0; i < différences.length; i++) {
						var spanRes = "";
						var spanTes = "";
						if (différences[i].added) {
							if (i < différences.length - 1 && différences[i + 1].added) {
								spanResTmpAjouté += différences[i].value;
							} else if (spanResTmpAjouté != "") {
								spanRes = `<span class="diff différentDel">${spanResTmpAjouté}</span>`;
							} else {
								spanRes = `<span class="diff différentDel">${différences[i].value}</span>`;
							}
						} else if (différences[i].removed) {
							if (i < différences.length - 1 && différences[i + 1].removed) {
								spanTesTmpEnlevé += différences[i].value;
							} else if (spanTesTmpEnlevé != "") {
								spanTes = `<span class="diff différentIns">${spanTesTmpEnlevé}</span>`;
							} else {
								spanTes = `<span class="diff différentIns">${différences[i].value}</span>`;
							}
						} else {
							spanRes = différences[i].value;
							spanTes = différences[i].value;
						}
						nouvelleSortieDiffRes += spanRes;
						nouvelleSortieDiffTes += spanTes;
					}
					this.resultatsModeDiff[i].sortie_observée = nouvelleSortieDiffRes;
					this.testsModeDiff[i].sortie_attendue = nouvelleSortieDiffTes;
				}
			}
		},
		copierTests(source, destination) {
			if (!source || source.length == 0) {
				return [];
			}
			if (source) {
				if (!destination || destination.length == 0) {
					destination = new Array(source.length);
				}

				for (let i = 0; i < source.length; i++) {
					destination[i] = {};
					destination[i].numéro = source[i].numéro;
					destination[i].nom = source[i].nom;
					destination[i].entrée = source[i].entrée;
					destination[i].sortie_attendue = source[i].sortie_attendue;
					destination[i].liens = {};
					destination[i].liens.related = source[i].liens.related;
					destination[i].liens.self = source[i].liens.self;
				}
			}
			return destination;
		},
		copierResultats(source, destination) {
			if (!source || source.length == 0) {
				return [];
			}
			if (source) {
				if (!destination || destination.length == 0) {
					destination = new Array(source.length);
				}

				for (let i = 0; i < source.length; i++) {
					destination[i] = {};
					destination[i].numéro = source[i].numéro;
					destination[i].feedback = source[i].feedback;
					destination[i].résultat = source[i].résultat;
					destination[i].sortie_observée = source[i].sortie_observée;
					destination[i].sortie_erreur = source[i].sortie_erreur;
					destination[i].liens = {};
					destination[i].liens.related = source[i].liens.related;
					destination[i].liens.self = source[i].liens.self;
				}
			}
			return destination;
		},
		réinitialiserListesOriginales() {
			this.copierResultats(this.resultatsCopie, this.resultats);
			this.copierTests(this.testsCopie, this.tests);
		},
	},
};
