<template>
	<div style="flex-grow: 1">
		<div class="container p-0">
			<div
				v-if="rôleÉditeur"
				class="row align-items-end"
				style="height: 1.5rem"
			>
				<div
					class="col-auto"
				>
					<div class="form-check form-switch btn-xray">
						<input
							id="btn_xray"
							v-model="xray"
							class="form-check-input"
							type="checkbox"
							name="btn_xray"
						>
						<label
							class="form-check-label"
							for="btn_xray"
						>Tout voir</label>
					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid p-0 h-100 position-relative">
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
			<div
				class="indicateur_sauvegarde"
				:class="classeIndicateur"
				style="z-index: 1"
			>
				●
			</div>
			<v-code-mirror
				id="editor"
				présentation_étape="1.1"
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
