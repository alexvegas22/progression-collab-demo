import parseMD from "@/util/parse";
import test from "../test/test";


export default {
	name: "Rétroaction",
	props: {
		test: null,
		générale: null,
	},
	methods:{
		storeRetro(){
			this.$store.state.question.tests[this.$store.state.question.tests.indexOf(this.test)].feedback.positive = this.test.feedback.positive;
			this.$store.state.question.tests[this.$store.state.question.tests.indexOf(this.test)].feedback.négative = this.test.feedback.négative;
			this.$store.state.question.tests[this.$store.state.question.tests.indexOf(this.test)].feedback.erreur = this.test.feedback.erreur;
		}
	},
};
