import parseMD from "@/util/parse";


export default {
	name: "Rétroaction",
	computed: {
		état_réussi() {
			return this.$store.state.avancement.état == 2;
		},
		question() {
			return new Proxy(this.$store.state.question, {
				get: function (obj, prop) {
					return prop == "énoncé" ? parseMD(obj[prop]) : obj[prop];
				},
			});
		},
	},

	data() {

		return {
			positive: this.$store.state.question.feedback.positive,
			négative: this.$store.state.question.feedback.négative,
			erreur: this.$store.state.question.feedback.erreur,
		};
	},
};
