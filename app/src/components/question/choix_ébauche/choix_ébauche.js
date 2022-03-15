export default {
	name: "ChoixÉbauche",
    computed: {
		langage() {
			return this.$store.state.tentative ? this.$store.state.tentative.langage : null;
		},
		/*langages() {
			return Object.keys(this.$store.state.question.ebauches);
		},*/
		langages() {
			return this.$store.state.listeLangages;
		},
        tentatives() {
			return this.$store.state.avancement.tentatives ?? [];
		},
    },
    methods: {		
		reinitialiserCodeEditeur(langage) {
			const msgAvertissement = this.$t("editeur.réinitialiser_avertissement");
			if (confirm(msgAvertissement) == true) {
				this.$store.dispatch("réinitialiser", langage);
			}
			this.$store.dispatch("réinitialiser", langage);
		},		
		nouvelleÉbauche(lang) {
			const langage = lang.toLowerCase();
			this.$store.dispatch("mettreAjourLangageSelectionne", langage);
			this.reinitialiserCodeEditeur(langage);			
		},
	},
};
