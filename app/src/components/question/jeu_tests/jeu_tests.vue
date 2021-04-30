<template>
	<h1 style="text-align: center">{{ $t("jeu_tests.jeuTests") }}</h1>
	<div v-for="(test, index) in tests" :key="index">
		<Test v-bind:test="test" v-bind:resultat="resultats[index]" v-bind:mode="mode" />
		<ResultatModes v-bind:test="tests" v-bind:resultats="resultats" v-bind:mode="mode" />
	</div>
</template>

<script src="./jeu_tests.js"></script>
