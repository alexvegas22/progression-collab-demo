import Enonce from "@/components/question/enonce/enonce.vue";
import EditeurCode from "@/components/question/editeur/editeur.vue";
import Avancement from "@/components/question/avancement/avancement.vue";
import JeuTests from "@/components/question/jeu_tests/jeu_tests.vue";
import RetroactionTentative from "@/components/question/retroaction_tentative/retroaction_tentative.vue";
import Présentation from "@/components/question/présentation/présentation.vue";

const API_URL = process.env.VUE_APP_API_URL;
const éléments = new Map();

export default {
	name: "Question",
	components: {
		Enonce,
		Avancement,
		EditeurCode,
		JeuTests,
		RetroactionTentative,
		Présentation,
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
		question() {
			return this.$store.state.question;
		},
		avancement() {
			return this.$store.state.avancement;
		},
		tentative() {
			return this.$store.state.tentative;
		},
		uri() {
			return this.$store.state.uri;
		},
		lang() {
			return this.$store.state.langageDéfaut;
		},
		démo() {
			return this.$store.state.démo;
		},
		erreurs() {
			return this.$store.state.erreurs;
		},
	},
	watch: {
		uri: function () {
			if (!this.question && this.uri && this.user) this.récupérerQuestion();
		},
		user: function () {
			if (!this.question && this.uri && this.user) this.récupérerQuestion();
		},
		question: function () {
			this.récupérerAvancement();
		},
	},
	mounted() {
		if(this.uri && this.user) this.récupérerQuestion();
	},
	methods: {
		récupérerAvancement() {
			const id_avancement = this.user.username + "/" + this.uri;

			if (id_avancement in this.user.avancements) {
				this.$store
					.dispatch("getAvancement", {
						url: this.user.avancements[id_avancement].liens.self,
						lang_défaut: this.lang,
					})
			} else {
				this.$store
					.dispatch("postAvancement", {
						url: this.user.liens.avancements,
						question_uri: this.uri,
						avancement: {},
						lang_défaut: this.lang,
					})
			}
		},
		récupérerQuestion() {
			this.$store.dispatch("getQuestion", API_URL + "/question/" + this.uri);
		},
		télécharger(){
			var question = this.créerHashMapQuestion();

			var element = document.createElement('a');
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.écrire(question)));
			element.setAttribute('download', "test.yml");
			element.style.display = 'none';
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
		},
		écrire(données) {
			var texte = "";
			éléments.set("type","type: ");
			éléments.set("niveau","niveau: ");
			éléments.set("titre","titre: ");
			éléments.set("description","description: ");
			éléments.set("énoncé","énoncé: |\n");
			éléments.set("ébauches","ébauches:\n");
			éléments.set("rétroaction","rétroaction:\n");
			éléments.set("tests","tests:");
			éléments.set("auteur","auteur: ");
			éléments.set("licence", "licence: ");
		
			const iterateur = données.keys();
		
			for (var element of iterateur){
				if(données.get(element) != null){
					if(element === "tests"){
						texte = this.formaterTests(texte,element,données);
					}else if(element === "ébauches"){
						texte = this.formaterÉbauche(texte,element);
					}else {
						texte += éléments.get(element) + données.get(element) +"\n\n" ;
					}
				}
			}
			return texte;
		},
		formaterÉnoncé(données) {
			var énoncéFormaté = données.replaceAll(":", "':'");
			return énoncéFormaté;
		},
		formaterRétroactions(pos, neg, err) {
			return "    positive: " + pos + "\n" + 
					"    négative: " + neg + "\n" + 
					"    erreur: " + err +"\n";
		},
		formaterTests(chaîne,element,données){
			chaîne +="\n"+ éléments.get(element)+"\n";
			for(var i of données.get(element)){
				chaîne += "    - nom: "+i.nom +
						"\n      entrée: \n        "+this.indenter(i.entrée)+
						"\n      sortie: | \n        "+this.indenter(i.sortie_attendue) ;
					}
					
			return chaîne + "\n";
		},
		formaterÉbauche(chaîne,element){
			chaîne += éléments.get(element)+ "\n    ";
						var langages = Object.getOwnPropertyNames(this.question.ebauches).toString();
						const tableauLangages = langages.split(",");
						for(var langage of tableauLangages){
							chaîne += langage+": |\n      "+this.question.ebauches[langage].code.replaceAll("\n","\n      ");
							chaîne +="\n    ";
						}
						return chaîne + "\n";
		},
		créerHashMapQuestion(){
			var question = new Map();
			question.set("type","prog");
			question.set("niveau",this.question.niveau);
			question.set("titre",this.question.titre);
			question.set("description",this.question.description);
			question.set("énoncé", this.formaterÉnoncé(this.question.énoncé));
			question.set("ébauches",this.question.ebauches);
			question.set("rétroaction",this.formaterRétroactions(this.question.feedback_pos, this.question.feedback_neg, this.question.feedback_err));
			question.set("tests",this.question.tests);
			question.set("auteur",this.question.auteur);
			question.set("licence",this.question.licence);
			return question;
		},
		indenter(chaîne){
			return chaîne.replaceAll("\n","\n        ");
		}
	},
};