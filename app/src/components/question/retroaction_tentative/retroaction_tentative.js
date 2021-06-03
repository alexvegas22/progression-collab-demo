import parseMD from "@/util/parse";
import VueTippy from "vue-tippy";

export default {
	name: "RetroactionTentative",
	components: { VueTippy },
	computed: {
		tentative() {
			return this.$store.state.tentative;
		},
		retroactionTentative() {
			let tentative = this.$store.state.retroactionTentative;

			return tentative
				? new Proxy(tentative, {
						get: function (obj, prop) {
							return prop == "feedback" ? parseMD(obj[prop]) : obj[prop];
						},
				  })
				: null;
		},
		testsRéussisPct() {
			return {
				width:
					(this.$store.state.retroactionTentative.tests_réussis / this.$store.state.question.tests.length) * 100 + "%",
			};
		},
		testsRatésPct() {
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
	},
};
