import parseMD from "@/util/parse";

export default {
	name: "Enonce",
	props: {
		énoncéPleinÉcran: Boolean,
		énoncéSemiÉcran: Boolean
	},
	emits: ['ajustéÉnoncé'],
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
};
