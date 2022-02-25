import parseMD from "@/util/parse";
import { library } from '@fortawesome/fontawesome-svg-core'

export default {
	name: "Enonce",
	emits: ['cacherEnoncer'],
	props: ['enoncerCacher'],
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
