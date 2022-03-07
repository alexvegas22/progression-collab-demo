import parseMD from "@/util/parse";

export default {
	name: "Enonce",
	computed: {
		état_réussi() {
			return this.$store.state.avancement.état == 2;
		},
		question() {
			return new Proxy(this.$store.state.question, {
				get: function (obj, prop) {
					return prop == "énoncé" ? parseMD(obj[prop]) : obj[prop];
				},
			});
		},
	}, methods: {
		download(question) {

			alert(this.$store.state.uri);
			///////////////////////////////////////////////////////////  A enlever
			//var question = new Map();
			question.set("type","Prog");
			question.set("niveau","Facile");
			question.set("titre","Test de d'écriture YML");
			question.set("énoncé","Premierement, ceci est un test. Deuxiemement, ceci n'est pas un test. Finalement, ceci est peut etre un test");
			/////////////////////////////////////////////////////////// A enlever
	  
			var element = document.createElement('a');
			//element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(formater(question)));
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(formater(question)));
			element.setAttribute('download', "test.yml");
	  
			element.style.display = 'none';
			document.body.appendChild(element);
	  
			element.click();
	  
			document.body.removeChild(element);
		  },
	  
	}
};



function formater(données){


	var texte = "";
	var question = new Map();
	question.set("type","type: ");
	question.set("niveau","niveau: ");
	question.set("titre","titre: ");
	question.set("description","description: ");
	question.set("énoncé","énoncé: |\n ");
	question.set("ébauche","ébauche:\n    python:\n    java:\n");
	question.set("rétroaction","rétroaction:\n    positive: \n    négative: \n    erreur: ");
	question.set("tests","tests:\n    - ");

	const iterateur = données.keys();
	for (var element of iterateur){
	  texte += question.get(element) + données.get(element) +"\n\n"
	}
	  return texte;
  }