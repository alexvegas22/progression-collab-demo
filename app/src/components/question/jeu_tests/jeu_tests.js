import Test from "@/components/question/test/test.vue";

export default {
	components: { Test },
	name: "JeuTests",
	computed: {
		tests() {
			return this.$store.state.question.tests;
		},
		resultats() {
			return this.$store.state.retroactionTentative.resultats ?? [];
		},
	},
	data() {
		return {
			resultatsTests: [],
		};
	},
	methods: {
		construireResultatsTests() {
			const listeResultatsTests = [];
			let i = 0;
			this.tests.forEach((unTest) => {
				const objet = {
					resultat: {},
					test: unTest,
				};
				if (this.resultats[i]) {
					objet.resultat = this.resultats[i];
				}
				listeResultatsTests.push(objet);
				i++;
			});
			return listeResultatsTests;
		},
	},
	watch: {
		tests: function () {
			this.resultatsTests = this.construireResultatsTests();
		},
		resultats: function () {
			this.resultatsTests = this.construireResultatsTests();
		},
	},
};
