export default {
	name: "ValidationTentative",
	props: ["uri", "username"],
	components: {},
	methods: {
		validerTentative() {
			this.$store.dispatch("soumettreTentative", {
				urlTentative: this.$store.state.avancement.liens["tentative"],
				langage: this.$store.state.langageTentative,
				code: this.$store.state.codeTentative,
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
