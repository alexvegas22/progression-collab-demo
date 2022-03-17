export default {
	name: "ChoixÉbauche",
	mounted() {
		this.aUneÉbauche();
	},
    computed: {
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
			return this.créerListeLangages();
		},
		langagesSupportés() {
			return this.$store.state.langagesSupportés;
		}
    },
    methods: {		
		changerÉbauche(langage) {
			this.sélectionnerÉbauche(langage);
		},
		sélectionnerÉbauche(langage) {
			this.$store.dispatch("mettreAJourLangageSelectionneÉbauche", langage);
			this.reinitialiserCodeEditeur(langage);
		},
		reinitialiserCodeEditeur(langage) {
			if (langage == "C++") {
				this.$store.dispatch("réinitialiserÉbauche", "cpp");
			} else {
				this.$store.dispatch("réinitialiserÉbauche", langage.toLowerCase());
			}
		},	
		langageParDéfaut() {
			var lang = Object.keys(this.$store.state.question.ebauches)[0];
			return lang.charAt(0).toUpperCase()+lang.slice(1);
		},
		nouveauLangage() {
			const nouveauLang = document.getElementById("nouveauLangage").value;
			var lang = {langageAffiché: nouveauLang, langageYML: nouveauLang};

			if(!this.estVideOuInvisible(lang)) {//or != existe
				const langsCourants = this.langagesSupportés;
				langsCourants.push(lang);
				this.$store.dispatch("ajouterLangagesSupportés", langsCourants);
				document.getElementById("nouveauLangage").value = "";
			} else {
				document.getElementById("nouveauLangage").value = "";
			}
		},
		existe(langage) {
			
		},
		estVideOuInvisible(langage){
			return langage === null || langage.langageAffiché.match(/^ *$/) !== null;
		},
		extraireLangagesAffichésSupportés(langageSupporté) {
			return langageSupporté.langageAffiché;
		},
		extraireLangagesYMLSupportés(langageSupporté) {
			return langageSupporté.langageYML;
		},
		créerListeLangages(){
			var langagesSupportés = this.langagesSupportés;
			var langagesAffichés = langagesSupportés.map(this.extraireLangagesAffichésSupportés);
			return langagesAffichés;
		},
		aUneÉbauche(){
			var langagesSupportés = this.langagesSupportés;
			var langagesÉbauchesQuestion = Object.keys(this.$store.state.question.ebauches);
			var langagesAffichés = langagesSupportés.map(this.extraireLangagesAffichésSupportés);
			var langagesYML = langagesSupportés.map(this.extraireLangagesYMLSupportés);

			for (let i = 0; i < langagesYML.length; i++) {
				for (let o = 0; o < langagesÉbauchesQuestion.length; o++) {
					if (langagesYML[i] === langagesÉbauchesQuestion[o]) {
						document.getElementById(langagesAffichés[i]).style.background='#6cd162';
					}
				}
			}
		},
	},
};
