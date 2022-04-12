export default {
	emits: ["basculerMenuCommentaire"],
	props:{
		menuOuvert: Boolean
	},
	methods: {
		basculerMenuCommentaire() {
			this.$emit("basculerMenuCommentaire");
		}
	}
};