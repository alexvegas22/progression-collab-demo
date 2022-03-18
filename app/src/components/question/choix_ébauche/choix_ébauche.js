export default {
	name: "ChoixÉbauche",
	mounted() {
		this.aUneÉbauche();
		//this.aUnBrouillon();
	},
    computed: {
		langage() {
			if (this.$store.state.langageSélectionné === null) {
				console.log("yé null");
				var langageDéfaut = this.langageParDéfaut();
				this.changerÉbauche(langageDéfaut);
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
		/*reinitialiserCodeEditeur(langage) {
			this.$store.dispatch("réinitialiserÉbauche", langage);
		},*/
		chargerÉbaucheTemporaire(langage){
			this.$store.dispatch("réinitialiserÉbaucheTemporaire", langage);
		},

		changerÉbauche(langage) {
			const donnéeTemporaire = this.$store.state.sauvegardesTemporaires;
			this.$store.dispatch("mettreAJourLangageSelectionneÉbauche", langage);
			//console.log(donnéeTemporaire);
			if(donnéeTemporaire.has(langage)){
				this.chargerÉbaucheTemporaire(langage);
				console.log(langage);
				//document.getElementById(langage).style.background='#4287f5';
			}else{
				this.reinitialiserCodeEditeur(langage);
			}
			this.aUnBrouillon(langage);
		},
		/*sélectionnerÉbauche(langage) {
            this.$store.dispatch("mettreAJourLangageSelectionneÉbauche", langage);
            this.reinitialiserCodeEditeur(langage);
        },*/
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

			/*const langagesStore = this.$store.state.langagesÉbauches;
			this.$store.dispatch("setLangageDéfaut", langagesStore);
		},
		getLangage(langage){
			const mapLangages = this.getMap();
			
			for (let [key, value] of mapLangages.entries()) {
				if (value === langage)
				  return key;
				}
			return langage;*/

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
		aUnBrouillon(langage) {
			const donnéeTemporaire = this.$store.state.sauvegardesTemporaires;
			var langagesSupportés = this.langagesSupportés;
			var langagesAffichés = langagesSupportés.map(this.extraireLangagesAffichésSupportés);

			//this.$store.dispatch("mettreAJourLangageSelectionneÉbauche", langage);
			console.log(langagesAffichés);
			console.log(donnéeTemporaire);
			console.log(langage);

			for (let i = 0; i < langagesAffichés.length; i++) {
				console.log("=====");
				if(donnéeTemporaire.has(langagesAffichés[i])){
					console.log("-----");
					//if (langagesAffichés[i] === langage) {
						console.log("oui !");
						document.getElementById(langagesAffichés[i]).style.background='#4287f5';
					//}
					console.log("woops");
				}
			}
		},

		
		/*getMap(){
			const map = new Map();
			map.set("bash","Bash");
			map.set("c","C");
			map.set("cpp","C++");
			map.set("clojure","Clojure");
			map.set("go","Go");
			map.set("java","Java");
			map.set("javascript","JavaScript");
			map.set("perl","Perl");
			map.set("php","PHP");
			map.set("powershell","Powershell");
			map.set("python","Python");
			map.set("ruby","Ruby");
			map.set("scala","Scala");
			map.set("typesript","Typesript");
			return map;
		}*/
	},
};
