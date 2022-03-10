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

			<div class="row" présentation_étape="0.1" style="justify-content: flex-end">
				<span class="badge niveau" présentation_étape="0.2">
					<!--
					<p
						class="contenu"
						contenteditable
						@input="(e) => modifierContenu(e, 0)"
						data-placeholder="Niveau"
						style="text-align: left"
					>
						{{ contenu[0].texte }}
					</p>
					
					!-->
					<input
						id="niveau"
						placeholder="Niveau"
						type="text"
						v-model="contenu[0].texte"
						list="niveaux"
						style="border: 0px; background-color: transparent; color: white;"
						onkeypress="
						if(this.value.length != 0){
							this.style.width = ((this.value.length + 3) * 8) + 'px';
						}else{
							this.style.width = ((this.placeholder.length + 3) * 8) + 'px';
						}"
					/>
					<datalist id="niveaux">
						<option>base</option>
						<option>débutant</option>
						<option>intermédiaire</option>
						<option>avancé</option>
					</datalist>
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

			<tab-nav :tabs="['Énoncé', 'Rétroactions', 'Description']" :selected="selected" @selected="setSelected">
				<tab :isSelected="selected === 'Énoncé'">
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
				</tab>

				<tab :isSelected="selected === 'Rétroactions'">
					<label> Rétroaction positive </label>
					<div v-if="aperçu">
						<div class="row flex-grow-1">
							<v-md-editor v-model="positive" height="30%" mode="preview"></v-md-editor>
						</div>
					</div>
					<div v-else>
						<div class="row flex-grow-1">
							<v-md-editor
								v-model="positive"
								height="30%"
								mode="edit"
								left-toolbar="undo redo | bold italic strikethrough | quote ul ol | documentation"
								:toolbar="toolbar"
								right-toolbar=""
							>
							</v-md-editor>
						</div>
					</div>
					<label> Rétroaction négative</label>
					<div v-if="aperçu">
						<div class="row flex-grow-1">
							<v-md-editor v-model="négative" height="30%" mode="preview"></v-md-editor>
						</div>
					</div>
					<div v-else>
						<div class="row flex-grow-1">
							<v-md-editor
								v-model="négative"
								height="30%"
								mode="edit"
								left-toolbar="undo redo | bold italic strikethrough | quote ul ol | documentation"
								:toolbar="toolbar"
								right-toolbar=""
							>
							</v-md-editor>
						</div>
					</div>
					<label> Rétroaction erreur</label>
					<div v-if="aperçu">
						<div class="row flex-grow-1">
							<v-md-editor v-model="erreur" height="30%" mode="preview"></v-md-editor>
						</div>
					</div>
					<div v-else>
						<div class="row flex-grow-1">
							<v-md-editor
								v-model="erreur"
								height="30%"
								mode="edit"
								left-toolbar="undo redo | bold italic strikethrough | quote ul ol | documentation"
								:toolbar="toolbar"
								right-toolbar=""
							>
							</v-md-editor>
						</div>
					</div>
				</tab>

				<tab :isSelected="selected === 'Description'">
					<div v-if="aperçu">
						<div class="row flex-grow-1">
							<v-md-editor v-model="description" height="600px" mode="preview"></v-md-editor>
						</div>
					</div>
					<div v-else>
						<div class="row flex-grow-1">
							<v-md-editor
								v-model="description"
								height="600px"
								mode="edit"
								left-toolbar="undo redo | bold italic strikethrough | quote ul ol table link code | documentation"
								:toolbar="toolbar"
								right-toolbar="fullscreen"
							>
							</v-md-editor>
						</div>
					</div>
				</tab>
			</tab-nav>

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
