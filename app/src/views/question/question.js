import Enonce from "@/components/question/enonce/enonce.vue";
import EditeurCode from "@/components/question/editeur/editeur.vue";
import Avancement from "@/components/question/avancement/avancement.vue";
import JeuTests from "@/components/question/jeu_tests/jeu_tests.vue";
import RetroactionTentative from "@/components/question/retroaction_tentative/retroaction_tentative.vue";
import Présentation from "@/components/question/présentation/présentation.vue";

const API_URL = process.env.VUE_APP_API_URL;

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
		retroactionTentative() {
			return this.$store.state.retroactionTentative;
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
			//alert(this.question.tests[0].nom)
			var question = new Map();
			question.set("type","Prog");
			question.set("niveau",this.question.niveau);
			question.set("titre",this.question.titre);
			question.set("description",this.question.description);
			question.set("énoncé", this.formaterÉnoncé(this.question.énoncé));
			question.set("ébauche",this.tentative.code);
			question.set("rétroaction",this.retroactionTentative.feedback);
			//question.set("rétroaction",this.question.feedback_pos);
			question.set("tests",this.question.tests);
			question.set("auteur",this.question.auteur);
			question.set("licence",this.question.licence);

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
			var question = new Map();
			question.set("type","type: ");
			question.set("niveau","niveau: ");
			question.set("titre","titre: ");
			question.set("description","description: ");
			question.set("énoncé","énoncé: |\n");
			question.set("ébauche","ébauche:\n    python:\n    java:\n");
			question.set("rétroaction","rétroaction:\n");//    positive: \n    négative: \n    erreur: ");
			question.set("tests","tests:\n");
			question.set("auteur", "auteur: ");
			question.set("licence", "licence: ");
		
			const iterateur = données.keys();
		
			for (var element of iterateur){
				//if(données.get(element) != null){
					if(element === "tests"){
						texte += question.get(element);
						for(var i of données.get(element)){
							texte += "    - nom: "+i.nom +
							"\n      entrée: "+i.entrée+
							"\n      sortie: | \n     "+i.sortie_attendue+"\n\n" ;
						}
					}else{
						texte += question.get(element) + données.get(element) +"\n\n" ;
					}
				//}
			}
			  return texte;
		},
		formaterÉnoncé(données) {
			var énoncéFormaté = données.replace(":", "':'");
			//var énoncéFormaté = "'"+données+"'";
			return énoncéFormaté;
		},
	},
};