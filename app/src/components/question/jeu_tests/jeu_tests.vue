<template>
	<h1 style="text-align: center">Jeu de tests</h1>
	<div v-for="(test, index) in tests" :key="index">
		<Test v-bind:test="test" v-bind:resultat="resultats[index]" />
	</div>
</template>

<script src="./jeu_tests.js"></script>
