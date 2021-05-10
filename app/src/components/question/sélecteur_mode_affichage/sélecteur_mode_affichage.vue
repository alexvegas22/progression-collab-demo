<template>
	<div class="text-center">
		{{$t("mode_affichage")}}: 
		<input class="btn btn-primary" data-toggle="button"
					  type="button"
					  id="btn_mode_normal"
					  name="btn_mode_normal"
					  checked="checked"
					  autocomplete="off"
			   v-model="mode_affichage"
			   v-on:click="changer_mode"
		/>
	</div>
</template>

<script src="./sélecteur_mode_affichage.js"></script>

<style src="./sélecteur_mode_affichage.css"></style>
