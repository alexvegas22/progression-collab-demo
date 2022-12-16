export default {
	name: "BoutonSoumission",
	computed: {
		raccourcis(){
			return this.$store.state.raccourcis;
		},
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
		erreurCallback() {
			return this.$store.state.erreur_callback;
		}
	},
	methods: {
		validerTentative() {
			this.$store.dispatch("soumettreTentative", {
				tentativeCourante: this.$store.state.tentative
			});
		},
	}
};
