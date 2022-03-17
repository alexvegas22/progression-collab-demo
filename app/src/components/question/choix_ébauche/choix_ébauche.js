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
		chargerÉbaucheTemporaire(langage){
			this.$store.dispatch("réinitialiserÉbaucheTemporaire", langage);
		},
		sélectionnerÉbauche(langage) {
			this.$store.dispatch("mettreAJourLangageSelectionneÉbauche", langage);			
		},
		changerÉbauche(langage) {
			const donnéeTemporaire = this.$store.state.sauvegardesTemporaires;
			this.sélectionnerÉbauche(langage);
			
			if(donnéeTemporaire.has(langage)){
				this.chargerÉbaucheTemporaire(langage);
			}else{
				this.reinitialiserCodeEditeur(this.getLangage(langage));
			}
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
			const langagesStore = this.$store.state.langagesÉbauches;
			const mapLangages = this.getMap();
			const langagesQuestion = Object.keys(this.$store.state.question.ebauches);

			/*for(var langage of langagesQuestion){
				if(!mapLangages.has(this.getLangage(langage)) && !langagesStore.includes(langage)){
					langagesStore.push(langage);
				}
			}*/
			this.$store.dispatch("setLangageDéfaut", langagesStore);
		},
		getLangage(langage){
			const mapLangages = this.getMap();
			
			for (let [key, value] of mapLangages.entries()) {
				if (value === langage)
				  return key;
				}
			return langage;
		},
		getMap(){
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
		}
	},
};
