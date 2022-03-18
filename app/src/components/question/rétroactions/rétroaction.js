import parseMD from "@/util/parse";


export default {
	name: "Rétroaction",
	props: {
		feedback_label: null,
		feedback_valeur: null,
		feedback_index: null,
		test_index: null,	
	},
	methods: {
		modifierFeedback(i) {
			switch(i) {
				case 0:
					this.$store.state.question.tests[this.test_index].feedback.positive = this.feedback[0];
				case 1:
					this.$store.state.question.tests[this.test_index].feedback.négative = this.feedback[1];
				case 2:
					this.$store.state.question.tests[this.test_index].feedback.erreur = this.feedback[2];
			}
		}
	},
	watch: {
		feedback_valeur: function() {
			this.feedback[0] = this.$store.state.question.tests[this.test_index].feedback.positive;
			this.feedback[1] = this.$store.state.question.tests[this.test_index].feedback.négative;
			this.feedback[2] = this.$store.state.question.tests[this.test_index].feedback.erreur;
		}
	},
	data() {
		return {
			feedback: [
				this.$store.state.question.tests[this.test_index].feedback.positive,
				this.$store.state.question.tests[this.test_index].feedback.négative,
				this.$store.state.question.tests[this.test_index].feedback.erreur,
			],
		};
	},
};
