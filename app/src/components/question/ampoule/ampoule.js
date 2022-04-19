import parseMD from "@/util/parse";
import { roundArrow } from "tippy.js"; // eslint-disable-line no-unused-vars
import { Tippy } from "vue-tippy";
import "tippy.js/dist/svg-arrow.css";

export default {
	name: "Ampoule",
	components: { Tippy },
	data() {
		return {
			conseilAffiché: false,
		};
	},
	computed: {
		tentative() {
			return this.$store.state.tentative;
		},
		retroactionTentative() {
			let tentative = this.$store.state.retroactionTentative;

			return tentative ? new Proxy(tentative, {
				get: function (obj, prop) {
					return prop == "feedback" ? parseMD(obj[prop]) : obj[prop];
				},
			}) : null;
		},
		msgReponseApi() {
			return this.$store.state.msgReponseApi;
		},
		tentativeEnCoursDeSoumission() {
			return this.$store.state.envoiTentativeEnCours;
		},
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
	methods: {
		basculerAffichageConseil() {
			this.conseilAffiché = !this.conseilAffiché;
		},
	}
};
