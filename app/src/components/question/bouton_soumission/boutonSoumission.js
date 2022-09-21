export default {
	emits: ["validerTentative"],
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
		validerTentative(){
			this.$emit("validerTentative");
		}
	},
};
