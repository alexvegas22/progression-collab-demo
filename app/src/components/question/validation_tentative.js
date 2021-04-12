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
			const avancement = this.$store.state.avancement
			const derniereTentative = this.$store.state.retroactionTentative
			derniereTentative.resultats = []
			avancement.tentatives.push(derniereTentative)
			if (avancement.état != 2) {
				avancement.état = (derniereTentative.réussi) ? 2 : 1
			}
			this.$store.commit("setAvancement", avancement);
		},
	},
	computed: {
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
};
