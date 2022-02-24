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
	},

	methods: {
		compteurRéussiPython: function (etat) {
			let compteur = 0;
			if(etat == 2) {
				compteur+=1;
			}
			return compteur;
		},
		compteurRéussiJava: function (etat) {
			let compteur = 0;
			if(etat == 2) {
				compteur+=1;
			}
			return compteur;
		}
	},
};