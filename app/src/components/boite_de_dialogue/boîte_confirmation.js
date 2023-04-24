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
		visible: Boolean,
		message: String
	},
	computed: {
		titre(){
			return this.$t("dialogues.boiteDeDialogue.erreurSurvenue");
		},
		choixOui(){
			return this.$t("dialogues.boiteDeDialogue.oui");
		},
		choixNon(){
			return this.$t("dialogues.boiteDeDialogue.non");
		},
	},
	watch: {
		visible(){
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
