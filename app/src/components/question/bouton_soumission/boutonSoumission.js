export default {
	emits: ["validerTentative"],
	computed: {
		raccourcis(){
			return this.$store.state.raccourcis;
		},
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
	methods: {
		validerTentative(){
			this.$emit("validerTentative");
		}
	},
};