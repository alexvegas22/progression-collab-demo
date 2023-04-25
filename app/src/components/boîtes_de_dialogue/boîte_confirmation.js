export default {
	data(){
		return {
			dialogueVisible: false,
		};
	},
	emits: {
		onRéponse: Object,
	},
	props: {
		isVisible: Boolean,
		message: String
	},
	computed: {
		titre(){
			return this.$t("dialogues.boiteDeDialogue.erreurSurvenue");
		},
		oui(){
			return this.$t("dialogues.boiteDeDialogue.oui");
		},
		non(){
			return this.$t("dialogues.boiteDeDialogue.non");
		},
	},
	watch: {
		isVisible(){
			this.dialogueVisible = true;
		}
	},
	methods: {
		onOui() {
			this.$emit("onRéponse", "oui");
			this.dialogueVisible = false;
		},
		onNon() {
			this.$emit("onRéponse", "non");
			this.dialogueVisible = false;
		}
	}
};
