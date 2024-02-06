export default {
	props: {
		résultat: null,
	},
	computed: {
		tentative() {
			return this.$store.state.tentative;
		},
	}
};
