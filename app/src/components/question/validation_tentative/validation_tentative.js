const API_URL = process.env.VUE_APP_API_URL;

export default {
	name: "ValidationTentative",
	components: {},
	methods: {
		validerTentative() {
			this.$store.dispatch("soumettreTentative", {
				langage: this.$store.state.tentative.langage,
				code: this.$store.state.tentative.code,
			});
		},
	},
	computed: {
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
};
