export default {
	name: "FenêtreInfo",
	computed: {
		thèmeSombre() {
			return this.$store.getters.thèmeSombre;
		}
	}
};
