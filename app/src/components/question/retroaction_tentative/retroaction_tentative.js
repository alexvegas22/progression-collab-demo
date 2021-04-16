import parseMD from "@/util/parse";

export default {
	name: "RetroactionTentative",
	computed: {
		retroactionTentative() {
			return this.$store.state.retroactionTentative;
		},
		resultats() {
			return this.retroactionTentative.resultats ?? [];
		},
		formatageFeedback() {
			this.retroactionTentative.feedback = parseMD(this.retroactionTentative.feedback);
		},
		testsPassent() {
			return this.retroactionTentative.réussi;
		},
		nbTestsReussis() {
			return this.retroactionTentative.tests_réussis;
		},
		msgReponseApi() {
			return this.$store.state.msgAPIEnvoiTentative;
		},
		tentativeEnCoursDeSoumission() {
			return this.$store.state.envoiTentativeEnCours;
		}
	}
};
