import { roundArrow } from "tippy.js"; // eslint-disable-line no-unused-vars
import { Tippy } from "vue-tippy";
import "tippy.js/dist/svg-arrow.css";

export default {
	name: "AmpouleRésultat",
	components: { Tippy },
	props: {
		feedback: String,
		panneauAffiché: Boolean,
	},
	data() {
		return {
			conseilAffiché: false,
		};
	},
	methods: {
		basculerAffichageConseil() {
			this.conseilAffiché = !this.conseilAffiché;
		},
	}
};