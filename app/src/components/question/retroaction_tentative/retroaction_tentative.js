import { roundArrow } from "tippy.js"; // eslint-disable-line no-unused-vars
import Ampoule from "@/components/question/ampoule/ampoule.vue";

export default {
	name: "RetroactionTentative",
	components: {
		Ampoule,
	},
	computed: {
		tentative() {
			return this.$store.state.tentative;
		},
		retroactionTentative() {
			return this.$store.state.retroactionTentative;
		},
		testsRéussisPct() {
			if (!this.$store.state.retroactionTentative) return null;
			return {
				width:
					(this.$store.state.retroactionTentative.tests_réussis / this.$store.state.question.tests.length) * 100 + "%",
			};
		},
		testsRatésPct() {
			if (!this.$store.state.retroactionTentative) return null;
			return {
				width:
					100 -
					(this.$store.state.retroactionTentative.tests_réussis / this.$store.state.question.tests.length) * 100 +
					"%",
			};
		},
		nbTests() {
			return this.$store.state.question.tests.length;
		},
		msgReponseApi() {
			return this.$store.state.msgReponseApi;
		},
		tentativeEnCoursDeSoumission() {
			return this.$store.state.envoiTentativeEnCours;
		},
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
};
