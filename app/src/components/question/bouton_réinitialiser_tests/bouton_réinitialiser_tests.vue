<template>
	<v-icon
		icon="mdi-refresh"
		v-show="dirty"
		class="boutonRafraichissement"
		:title="$t('jeu_tests.réinitialiser')"
		@click="réinitialiserTests"
	/>
</template>

<script src="./bouton_réinitialiser_tests.js"></script>
<style src="./bouton_réinitialiser_tests.css"></style>
