export default {
	name: "statistiqueTypesQuestions",

	computed: {

		user(){
			return this.$store.state.user;
		},
		avancements(){
			return this.$store.state.user.avancements;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives ?? [];
		},
		question_uri(){
			return this.$store.dispatch("getQuestion", API_URL + "/question/" + this.uri);
		},
	},

	methods: {
		compter: function(réussi, nbr){
			if (réussi){
				nbr += 1;
			}
			return nbr;
		},
		récupérerTentativesPython: function() {
			const id_avancement = this.user.username + "/" + this.uri;
			let nbrRéussi = 0;
			if (id_avancement in this.user.avancements) {
				for (var i=0; i<this.user.avancements.length; i++){
					let r = this.$store
					.dispatch("getTentativesRéussiesPython", {
						url: this.user.avancements[i].liens.self,
						lang_défaut: this.lang,
					}).then(this.compter(r, nbrRéussi))
				
				}
			}
			
			return nbrRéussi;
		},
	
		récupérerTentativesJava: function() {
			const id_avancement = this.user.username + "/" + this.uri;
			var nbrRéussi = 0;
			if (id_avancement in this.user.avancements) {
				for (var i=0; i<this.user.avancements.lenght; i++){
				if(this.$store
					.dispatch("getTentativesRéussiesJava", {
						url: this.user.avancements[i].liens.self,
						lang_défaut: this.lang,
					})){
						nbrRéussi += 1;
					}
				}
			}
			return nbrRéussi;
		},
	},
};