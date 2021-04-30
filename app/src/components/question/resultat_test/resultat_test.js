import parseMD from "@/util/parse";

export default {
	name: "ResultatTest",
	props: {
		test: null,
		resultat_p: null,
	},
	computed: {
		resultat() {
			return this.resultat_p
				? new Proxy(this.resultat_p, {
						get: function(obj, prop) {
							return prop == "feedback" ? parseMD(obj[prop]) : obj[prop];
						},
				  })
				: null;
		},
	},
};
