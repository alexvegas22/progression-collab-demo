<template>
	<div class="jumbotron encadré">
		<div class="container">
			<div v-if = "état_réussi" class="crochet icon icon--order-success svg">
				<svg xmlns="http://www.w3.org/2000/svg" width="82px" height="82px">
					<g>
						<circle cx="35" cy="40" r="25"  style="fill: #8EC343; stroke: #8EC343"></circle>
						<path d="M21.417,40.778l9.93,9.909l20.444-20.393" style="stroke-dasharray:50px, 50px; stroke-dashoffset: 0px; stroke-width: 6; stroke: white; fill: none"></path>
					</g>
				</svg>
			</div>

			<div class="row" présentation_étape="0.1" style="justify-content: flex-end">
				<span class="badge niveau" présentation_étape="0.2">
					<input
						id="niveau"
						placeholder="Niveau"
						type="text"
						v-model="contenu[0].texte"
						list="niveaux"
						style="border: 0px; background-color: transparent; color: white"
						onkeypress="
						if(this.value.length != 0){
							this.style.width = ((this.value.length + 3) * 8) + 'px';
						}else{
							this.style.width = ((this.placeholder.length + 3) * 8) + 'px';
						}"
						@change="modifierÉnoncé()"
					/>
					<datalist id="niveaux">
						<option>base</option>
						<option>débutant</option>
						<option>intermédiaire</option>
						<option>avancé</option>
					</datalist>
				</span>
				<h3
					id="titre"
					class="titre align-self-start contenu"
					contenteditable
					@input="(évènement) => modifierContenu(évènement, 1)"
					data-placeholder="Titre"
					@change="modifierÉnoncé()"
				>
					{{ contenu[1].texte }}
				</h3>
			</div>
			<br />
			<div v-show="modeÉdition" class="form-check form-switch btn-modeCréation">
				<input class="form-check-input" type="checkbox"
					id="btn_aperçu" @click="basculerBtnAperçu(), (aperçu = !aperçu)" />
				<label id="toggleText" class="form-check-label" for="btn_modeCréation">✎</label>
			</div>

			<v-md-editor v-if="!modeÉdition" v-model="énoncé" height="600px" mode="preview"></v-md-editor>

			<TabNav v-else :tabs="['Énoncé', 'Rétroactions', 'Description']" :selected="selected" @selected="setSelected">
				<Tab :isSelected="selected === 'Énoncé'"	>
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
								@change="modifierÉnoncé()"
							>
							</v-md-editor>
						</div>
					</div>
				</Tab>

				<Tab :isSelected="selected === 'Rétroactions'">
					<div v-for="(feedback, index) in feedbacks_label" :key="index">
						<Rétroaction
							:test="false"
							:feedback_label="feedbacks_label[index]"
							:feedback_valeur="feedback_select(index)"
							:feedback_index="index"
							:test_index="null"
						/>
					</div>
				</Tab>

				<Tab :isSelected="selected === 'Description'">
					<div class="row flex-grow-1">
						<v-md-editor v-model="description" height="600px" mode="edit" left-toolbar="" right-toolbar="" @change="modifierDescription()">
						</v-md-editor>
					</div>
				</Tab>
			</TabNav>

			<div>
				<div class="footer-copyright py-3">
					<p
						id="auteur"
						class="contenu"
						contenteditable
						@input="(évènement) => modifierContenu(évènement, 2)"
						data-placeholder="Auteur"
					>
						{{ contenu[2].texte }}
					</p>
					<p
						id="licence"
						class="contenu"
						contenteditable
						@input="(évènement) => modifierContenu(évènement, 3)"
						data-placeholder="Licence"
					>
						{{ contenu[3].texte }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./enonce.js"></script>

<style src="./enonce.css"></style>
