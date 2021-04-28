const diff = require("diff");

export default {
	name: "ResultatModes",
	props: {
		resultat: null,
		test: null,
	},
	data() {
		return {
			mode: undefined,
			resultatCopie: null,
			testCopie: null,
		};
	},
	mounted() {
		this.copierObjets();
	},
	watch: {
		mode: function(mode) {
			if (!this.resultatCopie) {
				this.copierObjets("résultat");
			}

			this.réinitialiserObjets();

			switch (mode) {
				case "visuel":
					this.changerModeComparaison();
					break;
				case "diff":
					this.différence();
					break;
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
			this.resultat.sortie_observée = this.remplacerCaractèresVisuels(this.resultat.sortie_observée);
			this.test.sortie_attendue = this.remplacerCaractèresVisuels(this.test.sortie_attendue);
		},
		différence() {
			if (!this.test.sortie_attendue) {
				return;
			}
			const différences = diff.diffChars(this.test.sortie_attendue, this.resultat.sortie_observée);
			var nouvelleSortieDiffRes = "";
			var nouvelleSortieDiffTes = "";
			différences.forEach(partie => {
				var spanRes = "";
				var spanTes = "";
				if (partie.added) {
					spanRes = `<span class="diff différentDel">${partie.value}</span>`;
				} else if (partie.removed) {
					spanTes = `<span class="diff différentIns">${partie.value}</span>`;
				} else {
					spanRes = partie.value;
					spanTes = partie.value;
				}
				nouvelleSortieDiffRes += spanRes;
				nouvelleSortieDiffTes += spanTes;
			});
			this.resultat.sortie_observée = nouvelleSortieDiffRes;
			this.test.sortie_attendue = nouvelleSortieDiffTes;
		},
		copierObjets(nomObjet = "les deux") {
			switch (nomObjet) {
				case ("résultat", "resultat"):
					this.copierResultat();
					break;
				case "test":
					this.copierTest();
					break;
				default:
					this.copierTest();
					this.copierResultat();
			}
		},
		copierTest() {
			if (this.test) {
				this.testCopie = {
					numéro: this.test.numéro,
					nom: this.test.nom,
					entrée: this.test.entrée,
					sortie_attendue: this.test.sortie_attendue,
					liens: {
						related: this.test.liens.related,
						self: this.test.liens.self,
					},
				};
			}
		},
		copierResultat() {
			if (this.resultat) {
				this.resultatCopie = {
					numéro: this.resultat.numéro,
					feedback: this.resultat.feedback,
					résultat: this.resultat.résultat,
					sortie_observée: this.resultat.sortie_observée,
					sortie_erreur: this.resultat.sortie_erreur,
					liens: {
						related: this.resultat.liens.related,
						self: this.resultat.liens.self,
					},
				};
			}
		},
		réinitialiserObjets() {
			if (this.test && this.testCopie) {
				this.test.numéro = this.testCopie.numéro;
				this.test.nom = this.testCopie.nom;
				this.test.entrée = this.testCopie.entrée;
				this.test.sortie_attendue = this.testCopie.sortie_attendue;
				this.test.liens.related = this.testCopie.liens.related;
				this.test.liens.self = this.testCopie.liens.self;
			}
			if (this.resultat && this.resultatCopie) {
				this.resultat.numéro = this.resultatCopie.numéro;
				this.resultat.feedback = this.resultatCopie.feedback;
				this.resultat.résultat = this.resultatCopie.résultat;
				this.resultat.sortie_observée = this.resultatCopie.sortie_observée;
				this.resultat.sortie_erreur = this.resultatCopie.sortie_erreur;
				this.resultat.liens.related = this.resultatCopie.liens.related;
				this.resultat.liens.self = this.resultatCopie.liens.self;
			}
		},
	},
};
