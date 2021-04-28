<template>
	<div v-if="resultat" class="text-center">
		<input type="radio" id="normal" :name="'mode' + resultat.numero" value="normal" v-model="mode" />
		<label for="normal">Normal</label>
		<input type="radio" id="visuel" :name="'mode' + resultat.numero" value="visuel" v-model="mode" />
		<label for="visuel">Visuel</label>
		<input type="radio" id="diff" :name="'mode' + resultat.numero" value="diff" v-model="mode" />
		<label for="diff">Diff</label>
	</div>
</template>

<script src="./resultat_modes.js"></script>

<style src="./resultat_modes.css"></style>
