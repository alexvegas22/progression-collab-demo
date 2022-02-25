<template>
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

			<div v-if="aperçu">
				<div class="row" présentation_étape="0.1">
					<h3 class="titre align-self-start">
						{{ titre }}
						<span class="badge niveau" présentation_étape="0.2"> {{ niveau }} </span>
					</h3>
				</div>

				<div class="row flex-grow-1">
					<v-md-editor v-model="énoncé" height="600px" mode="preview"></v-md-editor>
				</div>

				<div>
					<p class="footer-copyright text-center py-3">{{ auteur }} {{ licence }}</p>
				</div>
			</div>

			<div v-else>
				<div class="row flex-grow-1" présentation_étape="0.1">
					<input type="text" placeholder="Titre" id="titre" v-model="titre" />
				</div>
				
				<div class="row flex-grow-1">
						<input id="niveau" placeholder="Niveau" type="text" v-model="niveau" list="niveaux" />
						<datalist id="niveaux">
							<option>base</option>
							<option>débutant</option>
							<option>intermédiaire</option>
							<option>avancé</option>
						</datalist>
				</div>

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

				<div>
					<p class="footer-copyright text-center py-3">
						<input id="auteur" type="text" placeholder="Auteur"  v-model="auteur" />
						<input id="licence" type="text" placeholder="Licence"  v-model="licence" />
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./enonce.js"></script>
<style src="./enonce.css"></style>
