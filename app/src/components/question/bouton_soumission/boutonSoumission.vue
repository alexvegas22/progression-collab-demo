<template>
	<div>
		<svg 
			id="btn_soumettre_tentative"
			v-shortkey="raccourcis.soumettreTentative"
			type="button"
			class="btn btn-valider"
			:disabled="envoiEnCours"
			présentation_étape="1.2"
			@click="validerTentative"
			@shortkey="validerTentative"
		> 
			<use xlink:href="./svg_bouton_play/play-button-svgrepo-com.svg#Capa_2" />
		</svg>
		<div :class="{spin: envoiEnCours}" />
	</div>
</template>

<script src="./boutonSoumission.js"></script>
<style src="./boutonSoumission.css"></style>