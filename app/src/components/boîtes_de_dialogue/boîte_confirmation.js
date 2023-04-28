export default {
	name: "FenêtreConfirmation",
	data(){
		return {
			dialogueVisible: false,
		};
	},
	emits: {
		onRéponse: Object,
	},
	props: {
		estVisible: Boolean,
		titre: String,
		message: String
	},
	computed: {
		oui(){
			return this.$t("dialogues.boiteDeDialogue.oui");
		},
		non(){
			return this.$t("dialogues.boiteDeDialogue.non");
		},
	},
	watch: {
		estVisible(){
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
