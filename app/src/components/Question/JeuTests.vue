<template>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
	<h1 style="text-align: center">Jeu de tests</h1>
	<div v-for="elem in this.resultatsTests" :key="elem">
		<Test v-bind:resultat_test="elem" />
	</div>
  <!--div v-for="test in tests" :key="test">
		<Test v-bind:test="test" />
	</div-->
	<!--div v-for="i in tests.length" :key="i">
		<Test v-bind:test="tests[i]" />
	</div-->
	<!--div v-if="resultats.length > 0">
		<div v-for="i in tests.length" :key="i">
			<Test v-bind:test="tests[i]" v-bind:resultat="resultats[i]" />
		</div>
	</div>
  <div v-else>
    <div v-for="i in tests.length" :key="i">
			<Test v-bind:test="tests[i]" v-bind:resultat="null" />
		</div>
  </div-->
</template>

<script>
import Test from "@/components/Question/Test.vue";

export default {
	components: { Test },
	name: "JeuTests",

	/*props: {
		tests: {
			required: true,
		},
		resultats: {
			required: true,
		},
	},*/
	computed: {
		tests() {
			//console.log("this.$store.state.question.tests = "+this.$store.state.question.tests.length)
			return this.$store.state.question.tests;
		},
		resultats() {
			return this.$store.state.retroactionTentative.resultats ?? [];
		},
	},
	data() {
		return {
			/*resultatsTests: {
        lesResultats: [],
				lesTests: this.tests,
      },*/
			resultatsTests: [],
		};
	},
	methods: {
		construireResultatsTests() {
      const listeResultatsTests = []
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
