<template>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
	<h1 style="text-align: center">Jeu de tests</h1>
	<!--div v-for="test in tests" :key="test">
		<Test v-bind:test="test" />
	</div-->
	<div v-if="resultats.length > 0">
		<div v-for="i in tests.length" :key="i">
			<Test v-bind:test="tests[i]" v-bind:resultat="resultats[i]" />
		</div>
	</div>
  <div v-else>
    <div v-for="i in tests.length" :key="i">
			<Test v-bind:test="tests[i]" v-bind:resultat="null" />
		</div>
  </div>
</template>

<script>
import Test from "@/components/Question/Test.vue";

export default {
	components: { Test },
	name: "JeuTests",

	props: {
		tests: {
			required: true,
		},
		resultats: {
			required: true,
		},
	},
	/*watch: {
		tests: function () {
			this.texteTests = this.tests;
		},
	},
	data() {
		return {
			texteTests: this.tests,
		};
	},*/
};
</script>
