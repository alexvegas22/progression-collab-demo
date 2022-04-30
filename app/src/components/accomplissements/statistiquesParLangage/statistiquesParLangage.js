export default {
	name: "statistiquesParLangage",
	computed: {
		user() {
			return this.$store.state.user;
		},
		nbRéussitesParLangage() {
			return this.$store.state.nbRéussitesParLangage;
		},
	},
	mounted() {
		return this.$store
			.dispatch("getNbRéussitesParLangage", {
				url: this.user.liens.self,
			});
	},
};