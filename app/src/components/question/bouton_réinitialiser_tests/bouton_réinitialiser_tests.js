export default {
	name: "BoutonRéinitialiserTests",
	computed: {
		resultats() {
			return this.$store.state.tentative?.resultats;
		},
		tests() {
			return this.$store.state.question?.tests;
		},
		dirty(){
			return this.resultats?.filter( t => t!=null ).length + this.tests.filter( t => t.dirty===true ).length;
		},
	},
	methods: {
		réinitialiserTests() {
			this.$store.dispatch("réinitialiserTests");
			this.$store.dispatch("setRésultats", []);
		}
	}
};
