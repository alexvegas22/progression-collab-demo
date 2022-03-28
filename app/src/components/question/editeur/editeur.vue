<template>
	<div style="flex-grow: 1">
		<div class="container p-0">
			<div class="row align-items-end" style="height: 0px">
				<div class="col-auto" v-if="rôleÉditeur">
					<div class="form-check form-switch btn-xray">
						<input class="form-check-input" type="checkbox" id="btn_xray" name="btn_xray" v-model="xray" />
						<label class="form-check-label" for="btn_xray">Tout voir</label>
					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid p-0 h-100 position-relative">
			<svg 
				id="btn_soumettre_tentative"
				type="button"
				class="btn btn-valider"
				:disabled="envoiEnCours"
				@click="validerTentative"
				présentation_étape="1.2"
			> 
				<use xlink:href="./svg_bouton_play/play-button-svgrepo-com.svg#Capa_2"></use>
			</svg>
			<div :class="{spin: envoiEnCours}"></div>

			<div class="indicateur_sauvegarde" :class="classeIndicateur" style="z-index: 1">●</div>

			<v-code-mirror
				présentation_étape="1.1"
				id="editor"
				style="height: 100%"
				class="taille_texte"
				:value="code"
				:mode="mode"
				:theme="thème"
				:xray="xray"
				@update:value="onChange"
			/>
		</div>
	</div>
</template>

<script src="./editeur.js"></script>

<style src="./editeur.css"></style>
