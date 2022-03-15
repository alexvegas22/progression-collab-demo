export default {
	name: "statistiquesParLangage",

	computed: {

		user() {
			return this.$store.state.user;
		},
		tentativesRéussies() {
			return this.$store.state.tentativesRéussies;
		},
	},

	mounted() {
		return this.$store
			.dispatch("getTentativesRéussies", {
				url: this.user.liens.self,
			})
	},
};