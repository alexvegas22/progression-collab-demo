import parseMD from "@/util/parse";

export default {
	name: "Enonce",
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
			retropos: this.$store.state.question.feedback.positive,
			retroneg: this.$store.state.question.feedback.négative,
			retroerr: this.$store.state.question.feedback.erreur,
		};
	},
};