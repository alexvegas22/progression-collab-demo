export default {
	name: "Rétroaction",
	props: {
		test: false,
		feedback_label: null,
		feedback_valeur: null,
		feedback_index: null,
		test_index: 0,
	},
	methods: {
		modifierFeedback(i) {
			if (this.test) {
				switch (i) {
					case 0:
						this.$store.state.question.tests[this.test_index].feedback.positive = this.feedback[0];
						break;

					case 1:
						this.$store.state.question.tests[this.test_index].feedback.négative = this.feedback[1];
						break;

					case 2:
						this.$store.state.question.tests[this.test_index].feedback.erreur = this.feedback[2];
						break;

				}
			} else {
				switch (i) {
					case 0:
						this.$store.state.question.feedback.positive = this.feedback[0];
						break;

					case 1:
						this.$store.state.question.feedback.négative = this.feedback[1];
						break;

					case 2:
						this.$store.state.question.feedback.erreur = this.feedback[2];
						break;

				}
			}
		}
	},
	watch: {
		feedback_valeur: function () {
			if (this.test) {
				this.feedback[0] = this.$store.state.question.tests[this.test_index].feedback.positive;
				this.feedback[1] = this.$store.state.question.tests[this.test_index].feedback.négative;
				this.feedback[2] = this.$store.state.question.tests[this.test_index].feedback.erreur;
			} else {
				this.feedback[0] = this.$store.state.question.feedback.positive;
				this.feedback[1] = this.$store.state.question.feedback.négative;
				this.feedback[2] = this.$store.state.question.feedback.erreur;
			}
		}
	},
	data() {
		if (this.test) {
			return {
				feedback: [
					this.$store.state.question.tests[this.test_index].feedback.positive,
					this.$store.state.question.tests[this.test_index].feedback.négative,
					this.$store.state.question.tests[this.test_index].feedback.erreur,
				]
			}
		}
		else {
			return {
				feedback: [
					this.$store.state.question.feedback.positive,
					this.$store.state.question.feedback.négative,
					this.$store.state.question.feedback.erreur,
				]
			}
		}
	},
};
