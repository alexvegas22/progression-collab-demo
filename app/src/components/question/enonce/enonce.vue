<template>
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
	<div class="jumbotron encadré">
		<div class="container">
			<div v-if="état_réussi" class="crochet icon icon--order-success svg">
				<svg xmlns="http://www.w3.org/2000/svg" width="82px" height="82px">
					<g>
						<circle cx="35" cy="40" r="25" style="fill: #8ec343; stroke: #8ec343"></circle>
						<path
							d="M21.417,40.778l9.93,9.909l20.444-20.393"
							style="stroke-dasharray: 50px, 50px; stroke-dashoffset: 0px; stroke-width: 6; stroke: white; fill: none"
						></path>
					</g>
				</svg>
			</div>

			<button id="btn_aperçu" v-on:click="cacher(), (aperçu = !aperçu)">Aperçu 👁</button>

			<div class="row" présentation_étape="0.1" style="justify-content: flex-end">
				<span class="badge niveau" présentation_étape="0.2">
					<p
						class="contenu"
						contenteditable
						@input="(e) => modifierContenu(e, 0)"
						data-placeholder="Niveau"
						style="text-align: left; display: inline; margin-right: 8px;"
					>
						{{ contenu[0].texte }}
					</p>
					<button
						id="menu_niveau"
						type="button"
						class="btn dropdown-toggle"
						data-bs-toggle="dropdown"
						aria-expanded="true"
						style="padding: 0px; border: 0px; background-color: transparent; color: dark;"
					>
					</button>
					<div class="dropdown-menu dropdown-menu-end" aria-labelledby="menu_niveau">
						<button v-on:click="dropdownChoix('base')" class="dropdown-item">base</button>
						<button v-on:click="dropdownChoix('débutant')" class="dropdown-item">débutant</button>
						<button v-on:click="dropdownChoix('intermédiaire')" class="dropdown-item">intermédiaire</button>
						<button v-on:click="dropdownChoix('avancé')" class="dropdown-item">avancé</button>
					</div>
				</span>
				<h3
					class="titre align-self-start contenu"
					contenteditable
					@input="(e) => modifierContenu(e, 1)"
					data-placeholder="Titre"
				>
					{{ contenu[1].texte }}
				</h3>
			</div>

			<div v-if="aperçu">
				<div class="row flex-grow-1">
					<v-md-editor v-model="énoncé" height="600px" mode="preview"></v-md-editor>
				</div>
			</div>
			<div v-else>
				<div class="row flex-grow-1">
					<v-md-editor
						v-model="énoncé"
						height="600px"
						mode="edit"
						left-toolbar="undo redo | bold italic strikethrough | quote ul ol table link code | documentation"
						:toolbar="toolbar"
						right-toolbar="fullscreen"
					>
					</v-md-editor>
				</div>
			</div>

			<div>
				<div class="footer-copyright py-3">
					<p class="contenu" contenteditable @input="(e) => modifierContenu(e, 2)" data-placeholder="Auteur">
						{{ contenu[2].texte }}
					</p>
					<p class="contenu" contenteditable @input="(e) => modifierContenu(e, 3)" data-placeholder="Licence">
						{{ contenu[3].texte }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./enonce.js"></script>
<style src="./enonce.css"></style>
