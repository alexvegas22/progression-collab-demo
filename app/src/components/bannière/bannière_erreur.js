export default {
	name: "BannièreErreur",
	computed: {
		erreurs() {
			return this.$store.getters.erreurs;
		},
	},
	methods : {
		effacerErreurs(){
			this.$store.dispatch("réinitialiserErreurs");
		},
	}
};
