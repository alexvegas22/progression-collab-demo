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
			return this.$store.state.langagesSupportés;
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
		langageParDéfaut() {
			return Object.keys(this.$store.state.question.ebauches)[0];
		},
		nouveauLangage() {
			var lang = document.getElementById("nouveauLangage").value;
			if(!this.estVideOuInvisible(lang)) { //&& !this.existe(lang)){
				const langsCourants = this.langages;
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
			return langage === null || langage.match(/^ *$/) !== null;
		},
		extraireLangagesAffichésSupportés(langageSupporté) {
			console.log("Affiché : -"+langageSupporté.langageAffiché);
			console.log("YML : -"+langageSupporté.langageYML);
			return langageSupporté.langageAffiché;
		},
		getLangageAffiché(langageSupporté) {
			return langageSupporté.langageAffiché;
		},
		extraireLangagesYMLSupportés(langageSupporté) {
			console.log("Affiché : -"+langageSupporté.langageAffiché);
			console.log("YML : -"+langageSupporté.langageYML);
			return langageSupporté.langageYML;
		},
		getLangageYML(langage) {
			var langagesSupportés = this.$store.state.langagesSupportés;
			var langagesYML = langagesSupportés.map(this.extraireLangagesYMLSupportés);
			
			for(let i = 0; i < langagesYML.length; i++) {
				if (langagesYML[i] === langage) {
					return langagesYML[i];
				}
			}

			console.log("YML2 : -"+langagesSupportés.langageYML);
			//return langageSupporté.langageYML;
		},
		créerListeLangages(){
			var langagesSupportés = this.$store.state.langagesSupportés;
			var langagesÉbauchesQuestion = Object.keys(this.$store.state.question.ebauches);
			var langagesAffichés = langagesSupportés.map(this.extraireLangagesAffichésSupportés);
			//alert(langagesÉbauchesQuestion.length);

			//function 
			this.$store.dispatch("ajouterLangagesSupportés", langagesAffichés);
//#region 
				//for(let i = 0; i < langagesSupportés.length; i++) {
					/*for(let j = 0; j < langagesÉbauchesQuestion.length; j++) {
						console.log("Existing : -"+langagesÉbauchesQuestion[j]);

						// Trouver comment mettre l'ébauche java dans Java de la liste
						if (langagesÉbauchesQuestion[j] === langageSupporté.langageYML) {
							console.log("-------------------------------------------------");
							console.log(langageSupporté.langageAffiché);
							console.log("-------------------------------------------------");
							return langageSupporté.langageAffiché;
						} else {
							return langageSupporté.langageAffiché;
						}
					}*/
					//console.log("Hardcoded : -"+langagesSupportés[i].langageYML);
					/*if (langageSupporté.langageYML === langagesSupportés[i].langageYML){
						//langagesAffichés.push(langagesSupportés[i].langagesAffichés);
						return langageSupporté.langageAffiché;
					}*/
				//}
//#endregion

			for(var langage of langagesÉbauchesQuestion){
				if(!this.$store.state.langagesSupportés.includes(langage)){
					langagesAffichés.push(langage);
				}
			}
		},
	},
};
