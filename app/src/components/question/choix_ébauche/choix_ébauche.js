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
			const langs = ["Bash","C","C++","Clojure","Go","Java","JavaScript","Perl","PHP","Powershell","Python","Ruby","Scala","TypeScript"];
			return langs;
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
		},		
		nouvelleÉbauche(langage) {
			this.$store.dispatch("mettreAjourLangageSelectionne", langage);			
		},
	},
};
