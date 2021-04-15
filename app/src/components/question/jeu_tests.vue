<template>
	<h1 style="text-align: center">{{$t('jeu_tests.jeuTests')}}</h1>
	<div v-for="elem in this.resultatsTests" :key="elem">
		<Test v-bind:resultat_test="elem" />
	</div>
</template>

<script src="./jeu_tests.js"></script>
