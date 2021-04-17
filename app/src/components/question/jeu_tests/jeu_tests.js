import Test from "@/components/question/test/test.vue";

export default {
	components: { Test },
	name: "JeuTests",
	computed: {
		tests(){
			return this.$store.state.question.tests;
		},
		resultats(){
			return this.$store.state.retroactionTentative ? this.$store.state.retroactionTentative.resultats : [];
		},
	},
};
