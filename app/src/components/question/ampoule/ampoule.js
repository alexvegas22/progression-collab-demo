import parseMD from "@/util/parse";

export default {
	name: "Ampoule",
	props: {
		feedback: String,
		estVisible: Boolean
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
