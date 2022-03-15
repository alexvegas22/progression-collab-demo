export default {
	name: "ChoixÉbauche",
    computed: {
		/*langage() {
			return this.$store.state.tentative ? this.$store.state.tentative.langage : null;
		},*/
		langage() {
			if (this.$store.state.langageSélectionné === null) {
				var langageDéfaut = this.langageParDéfaut();
				this.sélectionnerÉbauche(langageDéfaut);
				return this.$store.state.langageSélectionné;
			} else {
				return this.$store.state.langageSélectionné;
			}
		},

		langages() {
			this.créerListeLangages();
			return this.$store.state.langagesÉbauches;
		},

        tentatives() {
			return this.$store.state.avancement.tentatives ?? [];
		},
    },
    methods: {		
		reinitialiserCodeEditeur(langage) {
			this.$store.dispatch("réinitialiserÉbauche", langage);
		},		
		sélectionnerÉbauche(langage) {
			this.$store.dispatch("mettreAJourLangageSelectionneÉbauche", langage);			
		},
		changerÉbauche(langage) {
			this.sélectionnerÉbauche(langage);
			this.reinitialiserCodeEditeur(langage);
		},
		nouveauLangage() {
			var lang = document.getElementById("nouveauLangage").value;
			if(!this.estVideOuInvisible(lang)){
				const langsCourants = this.langages;
				langsCourants.push(lang);
				this.$store.dispatch("ajouterLangageÉbauche", langsCourants);
				document.getElementById("nouveauLangage").value = "";
			} else {
				document.getElementById("nouveauLangage").value = "";
			}
		},
		langageParDéfaut() {
			return Object.keys(this.$store.state.question.ebauches)[0];
		},
		estVideOuInvisible(langage){
			return langage === null || langage.match(/^ *$/) !== null;
		},
		créerListeLangages(){
			var langagesStore = this.$store.state.langagesÉbauches;
			var listeLangs = Object.keys(this.$store.state.question.ebauches);
			for(var langage of listeLangs){
				if(!state.langagesÉbauches.includes(langage)){
					langagesStore.push(langage);
				}
			}
			this.$store.dispatch("créerListeLangage", langagesStore);
		},
	},
};
