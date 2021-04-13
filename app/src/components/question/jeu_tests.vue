<template>
	<h1 style="text-align: center">Jeu de tests</h1>
	<div v-for="elem in this.resultatsTests" :key="elem">
		<Test v-bind:resultat_test="elem" />
	</div>
</template>

<script src="./jeu_tests.js"></script>
