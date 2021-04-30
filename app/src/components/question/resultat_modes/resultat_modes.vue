<template>
	<div class="text-center" v-if="resultats.length > 0">
		<input
			type="radio"
			id="normal"
			name="modeBtn"
			value="normal"
			checked="checked"
			autocomplete="off"
			v-model="modeBtn"
		/>
		<label for="normal">{{ $t("resultat_modes.modeNormal") }}</label>
		<input type="radio" id="visuel" name="modeBtn" value="visuel" v-model="modeBtn" />
		<label for="visuel">{{ $t("resultat_modes.modeVisuel") }}</label>
		<input type="radio" id="diff" name="modeBtn" value="diff" v-model="modeBtn" />
		<label for="diff">{{ $t("resultat_modes.modeDiff") }}</label>
	</div>
</template>

<script src="./resultat_modes.js"></script>

<style src="./resultat_modes.css"></style>
