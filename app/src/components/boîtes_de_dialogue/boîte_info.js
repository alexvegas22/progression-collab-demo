export default {
	name: "BoîteInfo",
	data(){
		return {
			visible: false,
		};
	},
	props: {
		montrer: Boolean,
		titre: {
			type: String,
			default: "Information"
		},
		message: String
	},
	watch: {
		montrer(){
			this.visible = true;
		}
	},
	methods: {
		onContinuer() {
			this.visible = false;
		}
	}
};
