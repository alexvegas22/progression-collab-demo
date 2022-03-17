export default {
	name: "ChoixÉbauche",
	date() {
		return {
			avecÉbauche: false,
		};
	},
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
				console.log("Sélectionné: "+this.$store.state.langageSélectionné)
				return this.$store.state.langageSélectionné;
			}
		},

		langages() {
			this.créerListeLangages();
			return this.$store.state.langagesSupportés;
		},
    },
    methods: {		
		changerÉbauche(langage) {
			//document.getElementById(langage).style.background='#6cd162';
			this.aUneÉbauche(langage);
			this.sélectionnerÉbauche(langage);
			this.reinitialiserCodeEditeur(langage);
		},
		sélectionnerÉbauche(langage) {
			this.$store.dispatch("mettreAJourLangageSelectionneÉbauche", langage);			
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
			return langageSupporté.langageAffiché;
		},
		extraireLangagesYMLSupportés(langageSupporté) {
			return langageSupporté.langageYML;
		},
		créerListeLangages(){
			var langagesSupportés = this.$store.state.langagesSupportés;
			var langagesÉbauchesQuestion = Object.keys(this.$store.state.question.ebauches);
			var langagesAffichés = langagesSupportés.map(this.extraireLangagesAffichésSupportés);
			var langagesYML = langagesSupportés.map(this.extraireLangagesYMLSupportés);
			//alert(langagesÉbauchesQuestion);


			for (let i = 0; i < langagesYML.length; i++) {
				for (let o = 0; o < langagesÉbauchesQuestion.length; o++) {
					if (langagesYML[i] === langagesÉbauchesQuestion[o]) {
						//document.getElementById('btnLangage').style.background='#6cd162';
						/*var btn = document.getElementById("btnLangage");
						var e = document.createElement("i");
						e.setAttribute("class",'<i class="bi bi-body-text"></i>')
						e.innerHTML = '<i class="bi bi-body-text"></i>';
						btn.appendChild(e);*/
						//langagesAffichés[i] = " * " + langagesAffichés[i];
					}
				}
			}

			/*for(var langage of langagesÉbauchesQuestion){
				if(!this.$store.state.langagesSupportés.includes(langage)){
					langagesAffichés.push(langage);
				}
			}*/
			this.$store.dispatch("ajouterLangagesSupportés", langagesAffichés);
		},
		aUneÉbauche(langage){
			var langagesSupportés = this.$store.state.langagesSupportés;
			var langagesÉbauchesQuestion = Object.keys(this.$store.state.question.ebauches);
			var langagesAffichés = langagesSupportés.map(this.extraireLangagesAffichésSupportés);
			var langagesYML = langagesSupportés.map(this.extraireLangagesYMLSupportés);

			console.log(langagesÉbauchesQuestion);
			console.log(langagesYML);
			console.log(langage);

			for (let i = 0; i < langagesYML.length; i++) {
				console.log("se rend ici 2");
				
				if (langagesAffichés[i] === langage) {
					console.log("se rend ici 3");
					document.getElementById(langage).style.background='#6cd162';
					/*var btn = document.getElementById("btnLangage");
					var e = document.createElement("i");
					e.setAttribute("class",'<i class="bi bi-body-text"></i>')
					e.innerHTML = '<i class="bi bi-body-text"></i>';
					btn.appendChild(e);*/
					//langagesAffichés[i] = " * " + langagesAffichés[i];
					//this.avecÉbauche = true;
				}
			}
		},
	},
};
