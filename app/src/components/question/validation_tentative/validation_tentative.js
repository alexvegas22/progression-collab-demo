export default {
	name: "ValidationTentative",
	props: ["uri", "username"],
	components: {},
	methods: {
		validerTentative() {
			this.$store.dispatch("soumettreTentative", {
				urlTentative: this.$store.state.avancement.liens["tentative"],
				langage: this.$store.state.tentative.langage,
				code: this.$store.state.tentative.code,
				username: this.username,
				uri: this.uri,
			});
		},
	},
	computed: {
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
};
