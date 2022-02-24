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
	methods: {
		cacher() {
			var element = document.getElementById("hh").innerHTML;
			if (element == "✎") {
				document.getElementById("hh").innerHTML = "👁";
			} else {
				document.getElementById("hh").innerHTML = "✎";
			}

		}
	},
	data() {
		return {
			count: 0,
			niveau: this.$store.state.question.niveau,
			aperçu: false,
		};
	},

};
