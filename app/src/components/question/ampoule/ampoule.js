import parseMD from "@/util/parse";

export default {
	name: "Ampoule",
	props: {
		feedback: String,
		estVisible: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			conseilAffiché: false,
		};
	},
	computed: {
		feedback_md() {
			return parseMD(this.feedback);
		},
	},
	methods: {
		basculerAffichageConseil() {
			this.conseilAffiché = !this.conseilAffiché;
		},
	}
};
