export default {
    data(){
		return {
			dialog: false,
		};
    },
	emits: {
		onReponse: Object,
	},
	props: {
		visible: Boolean,
		messageDeValidation: String
	},
	computed: {
		titre(){
			return this.$t("dialogues.boiteDeDialogue.titreAvertissement");
		},
		choixOui(){
			return this.$t("dialogues.boiteDeDialogue.choixOui");
		},
		choixNon(){
			return this.$t("dialogues.boiteDeDialogue.choixNon");
		},
	},
	watch: {
		visible(){
			this.dialog = true;
		}
	},
	methods: {
		onOui() {
			this.$emit('onReponse', "oui");
			this.dialog = false;
		},
		onNon() {
			this.$emit('onReponse', "non");
			this.dialog = false;
		}
	}
};
