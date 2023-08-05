import parseMD from "@/util/parse";

export default {
	name: "Enonce",
	props: {
		énoncéPleinÉcran: Boolean,
		énoncéSemiÉcran: Boolean
	},
	data() {
		return {tab: null};
	},
	emits: ["ajustéPanneauÉnoncé"],
	computed: {
		état_réussi() {
			return this.$store.state.avancement.état == "réussi";
		},
		question() {
			return new Proxy(this.$store.state.question, {
				get: function (obj, prop) {
					if(prop != "énoncé"){
						return obj[prop];
					}
					const énoncé = obj["énoncé"];
					if(!Array.isArray(énoncé)){
						return [{
							titre: null,
							texte: parseMD(énoncé)
						}];
					}
					return énoncé.map( page => ({
						titre: page.titre,
						texte: parseMD(page.texte)
					}));
				},
			});
		},
	},
};
