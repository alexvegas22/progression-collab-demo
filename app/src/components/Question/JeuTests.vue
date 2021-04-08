<template>
	<h1 style="text-align: center">Jeu de tests</h1>
	<div v-for="elem in this.resultatsTests" :key="elem">
		<Test v-bind:resultat_test="elem" />
	</div>
</template>

<script>
import Test from "@/components/Question/Test.vue";

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
</script>
