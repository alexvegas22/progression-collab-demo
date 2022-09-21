<template>
	<div class="btn-valider">
		<svg 
			id="btn_soumettre_tentative"
			v-shortkey="raccourcis.soumettreTentative"
			type="button"
			class="btn btn-valider-play"
			:disabled="envoiEnCours"
			présentation_étape="1.2"
			@click="validerTentative"
			@shortkey="validerTentative"
		> 
			<use xlink:href="./svg_bouton_play/play-button-svgrepo-com.svg#Capa_2" />
		</svg>
		<div :class="{spin: envoiEnCours}" />
		<Tippy v-show="erreurCallback"
			trigger='click'
			interactive
			:aria="true"
			:show-on-create="false"
			:arrow="true"
			placement="bottom"
			class=" btn-valider-avertissement"
			:title="$t('retroaction_tentative.erreurCallback')"
		>
			<span class="fas fa-exclamation-triangle" style="color: orange" />
			<template #content>
				<div class="message_erreur">
					{{erreurCallback}}
				</div>
			</template>
		</Tippy>
	</div>
</template>

<script src="./boutonSoumission.js"></script>
<style src="./boutonSoumission.css"></style>
