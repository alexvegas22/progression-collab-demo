<template>
	<label class="switch" for="btn_mode_normal" :title="$t('mode_affichage')">
		<input class="custom-control-input" type="checkbox" 
			id="btn_mode_normal"
			name="btn_mode_normal"
			v-model="mode_affichage"
		/>
		<div class="slider round"></div>
	</label>	
</template>

<script src="./sélecteur_mode_affichage.js"></script>
<style src="./sélecteur_mode_affichage.css"></style>
