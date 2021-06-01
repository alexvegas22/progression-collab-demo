import parseMD from "@/util/parse";

export default {
	name: "Enonce",
	computed: {
		avancement() {
			return this.$store.state.avancement;
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
