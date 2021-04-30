import Test from "@/components/question/test/test.vue";
import ResultatModes from "@/components/question/resultat_modes/resultat_modes.vue";

export default {
	components: { Test, ResultatModes },
	name: "JeuTests",
	computed: {
		tests() {
			return this.$store.state.question.tests;
		},
		resultats() {
			return this.$store.state.retroactionTentative ? this.$store.state.retroactionTentative.resultats : [];
		},
	},
	data() {
		return {
			mode: {
				normal: true,
				visuel: false,
				diff: false,
			},
		};
	},
};
