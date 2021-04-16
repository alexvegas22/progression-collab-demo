<template>
	<button
		type="button"
		class="btn btn-success btn-valider p-3"
		style="margin-top: 15px; width: 100%"
		:disabled="envoiEnCours"
		@click="validerTentative"
	>
	{{ $t('validation_tentative.boutonValider') }}
	</button>
</template>

<script src="./validation_tentative.js"></script>

<style src="./validation_tentative.css"></style>
