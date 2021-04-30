const diff = require("diff");

export default {
	name: "ResultatModes",
	props: {
		resultats: [],
		tests: [],
		mode: null,
	},
	data() {
		return {
			modeBtn: undefined,
			resultatsCopie: [],
			testsCopie: [],
			resultatsModeVisuel: [],
			testsModeVisuel: [],
			resultatsModeDiff: [],
			testsModeDiff: [],
		};
	},
	mounted() {
		this.copierTests(this.tests, this.testsCopie);
	},
	updated() {},
	watch: {
		resultats: function(res) {
			this.copierResultats(res, this.resultatsCopie);
		},
		modeBtn: function(mode) {
			if (!this.resultatsCopie || !this.testsCopie) {
				this.copierListes();
			}

			this.réinitialiserListesOriginales();

			switch (mode) {
				case "visuel":
					this.mode.normal = false;
					this.mode.visuel = true;
					this.mode.diff = false;
					this.changerModeComparaison();
					break;
				case "diff":
					this.mode.normal = false;
					this.mode.visuel = false;
					this.mode.diff = true;
					this.différence();
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
			for (let i = 0; i < this.resultats.length; i++) {
				this.resultats[i].sortie_observée = this.remplacerCaractèresVisuels(this.resultats[i].sortie_observée);
				this.tests[i].sortie_attendue = this.remplacerCaractèresVisuels(this.tests[i].sortie_attendue);
			}
		},
		différence() {
			for (let i = 0; i < this.tests.length; i++) {
				if (!this.tests[i].sortie_attendue) {
					return;
				}
				const différences = diff.diffChars(this.tests[i].sortie_attendue, this.resultats[i].sortie_observée);
				var nouvelleSortieDiffRes = "";
				var nouvelleSortieDiffTes = "";
				var spanResTmpAjouté = "";
				var spanTesTmpEnlevé = "";
				for (let i = 0; i < différences.length; i++) {
					var spanRes = "";
					var spanTes = "";
					if (différences[i].added) {
						if (différences[i + 1].added) {
							spanResTmpAjouté += différences[i].value;
						} else if (spanResTmpAjouté != "") {
							spanRes = `<span class="diff différentDel">${spanResTmpAjouté}</span>`;
						} else {
							spanRes = `<span class="diff différentDel">${différences[i].value}</span>`;
						}
					} else if (différences[i].removed) {
						if (différences[i + 1].removed) {
							spanTesTmpEnlevé += différences[i].value;
						} else if (spanTesTmpEnlevé != "") {
							spanRes = `<span class="diff différentIns">${spanTesTmpEnlevé}</span>`;
						} else {
							spanRes = `<span class="diff différentIns">${différences[i].value}</span>`;
						}
					} else {
						spanRes = différences[i].value;
						spanTes = différences[i].value;
					}
					nouvelleSortieDiffRes += spanRes;
					nouvelleSortieDiffTes += spanTes;
				}
				this.resultats[i].sortie_observée = nouvelleSortieDiffRes;
				this.tests[i].sortie_attendue = nouvelleSortieDiffTes;
			}
		},
		copierListes(nomListe = "les deux") {
			if (!this.resultatsCopie[0]) {
				this.copierResultats(this.resultats, this.resultatsCopie);
				this.copierTests(this.tests, this.testsCopie);
			}
			switch (nomListe) {
				case ("résultats", "resultats"):
					this.copierResultats(this.resultatsCopie, this.resultatsModeVisuel);
					this.copierResultats(this.resultatsCopie, this.resultatsModeDiff);
					break;
				case "tests":
					this.copierTests(this.testsCopie, this.testsModeVisuel);
					this.copierTests(this.testsCopie, this.testsModeDiff);
					break;
				default:
					this.copierTests(this.testsCopie, this.testsModeVisuel);
					this.copierTests(this.testsCopie, this.testsModeDiff);
					this.copierResultats(this.resultatsCopie, this.resultatsModeVisuel);
					this.copierResultats(this.resultatsCopie, this.resultatsModeDiff);
			}
		},
		copierTests(source, destination) {
			if (source != []) {
				for (let i = 0; i < destination.length; i++) {
					destination[i].numéro = source[i].numéro;
					destination[i].nom = source[i].nom;
					destination[i].entrée = source[i].entrée;
					destination[i].sortie_attendue = source[i].sortie_attendue;
					destination[i].liens.related = source[i].liens.related;
					destination[i].liens.self = source[i].liens.self;
				}
			}
		},
		copierResultats(source, destination) {
			if (source.length > 0) {
				for (let i = 0; i < destination.length; i++) {
					destination[i].numéro = source[i].numéro;
					destination[i].feedback = source[i].feedback;
					destination[i].résultat = source[i].résultat;
					destination[i].sortie_observée = source[i].sortie_observée;
					destination[i].sortie_erreur = source[i].sortie_erreur;
					destination[i].liens.related = source[i].liens.related;
					destination[i].liens.self = source[i].liens.self;
				}
			}
		},
		réinitialiserListesOriginales() {
			this.copierResultats(this.resultatsCopie, this.resultats);
			this.copierTests(this.testsCopie, this.tests);
		},
	},
};
