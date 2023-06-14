export default {
	name: "BoîteConfirmation",
	data(){
		return {
			visible: false,
		};
	},
	emits: {
		onRéponse: Object,
	},
	props: {
		montrer: Boolean,
		titre: {
			type: String,
			default: "Confirmation"
		},
		message: String
	},
	watch: {
		montrer(){
			this.visible = true;
		}
	},
	methods: {
		onOui() {
			this.$emit("onRéponse", "oui");
			this.visible = false;
		},
		onNon() {
			this.$emit("onRéponse", "non");
			this.visible = false;
		}
	}
};
