export default {
	name: "ResultatTest",
	props: {
		resultat_test: {
			required: true,
		},
	},
	data() {
		return {
			sortie_attendue: this.resultat_test.test.sortie_attendue,
			entree: this.resultat_test.test.entrée,
			sortie_erreur: this.resultat_test.resultat.sortie_erreur,
			sortie_console: this.resultat_test.resultat.sortie_observée,
			feedback: this.resultat_test.resultat.feedback,
		};
	},
};
