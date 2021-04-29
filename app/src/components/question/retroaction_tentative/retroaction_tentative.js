import parseMD from "@/util/parse";

export default {
	name: "RetroactionTentative",
	computed: {
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
			return this.$store.state.retroactionTentative.tests_réussis / this.$store.state.question.tests.length * 100;
		},
		msgReponseApi() {
			return this.$store.state.msgReponseApi;
		},
		tentativeEnCoursDeSoumission() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
};
