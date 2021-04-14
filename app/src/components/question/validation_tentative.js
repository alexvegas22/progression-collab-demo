const API_URL = process.env.VUE_APP_API_URL;

export default {
	name: "ValidationTentative",
	//props: ["uri", "username"],
	components: {},
	methods: {
		validerTentative() {
			this.$store.dispatch("soumettreTentative", {
				/*urlTentative: this.$store.state.avancement.liens["tentative"],
				langage: this.$store.state.langageTentative,
				code: this.$store.state.codeTentative,*/
				/*username: this.username,
				uri: this.uri,*/
				//avancementActuel: this.$store.state.avancement

				langage: this.$store.state.tentative.langage,
				code: this.$store.state.tentative.code,
				username: this.username,
				uri: this.uri,
			});
			/*if(this.$store.state.retroactionTentative){
				this.$store.dispatch("getAvancement", this.$store.state.avancement.liens["self"]);
			}*/
			//this.$store.dispatch("getAvancement", API_URL + "/avancement/" + this.$store.state.user.username + "/" + this.uri);
			/*const avancement = this.$store.state.avancement
			const derniereTentative = this.$store.state.retroactionTentative
			console.log("derniereTentative ===> "+derniereTentative)
			derniereTentative.resultats = []
			avancement.tentatives.push(derniereTentative)
			if (avancement.état != 2) {
				avancement.état = (derniereTentative.réussi) ? 2 : 1
			}
			this.$store.dispatch("rafraichirAvancement", avancement);*/
			//this.$store.dispatch("rafraichirAvancement", derniereTentative);
		},
	},
	computed: {
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
};
