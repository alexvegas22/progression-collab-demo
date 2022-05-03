export default {
	props: {
		résultat: null,
		tempsÉxecution: null,
	},
	computed: {
		tentative() {
			return this.$store.state.tentative;
		},
	}
};
