<template>
	<label
		class="switch"
		for="btn_mode_normal"
		:title="$t('mode_affichage')"
	>
		<input
			id="btn_mode_normal"
			v-model="mode_affichage"
			class="custom-control-input"
			type="checkbox"
			name="btn_mode_normal"

		>
		<div class="slider round"
			v-shortkey="raccourcis.basculerModeParDifférences"
			@shortkey="changerModeAffichageAvecRaccourci"
			:class="{occupé: occupé}"
		/>
	</label>	
</template>

<script src="./sélecteur_mode_affichage.js"></script>
<style scoped src="./sélecteur_mode_affichage.css"></style>
