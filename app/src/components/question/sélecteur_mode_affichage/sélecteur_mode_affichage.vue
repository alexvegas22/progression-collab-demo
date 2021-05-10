<template>
	<div class="text-center">
		<div class="custom-control custom-switch">
			<input class="custom-control-input" type="checkbox" 
				   id="btn_mode_normal"
				   name="btn_mode_normal"
				   v-model="mode_affichage"
			/>
			<label class="custom-control-label" for="btn_mode_normal">
				{{$t("mode_affichage")}}
			</label>
		</div>
	</div>
</template>

<script src="./sélecteur_mode_affichage.js"></script>

<style src="./sélecteur_mode_affichage.css"></style>
