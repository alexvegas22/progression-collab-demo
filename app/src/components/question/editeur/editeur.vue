<template>
	<div>
		<div class="container" style="padding-left: 0px; padding-right: 0px" >
			<div class="row align-items-end" style="height: 0px">
				<div class="col"></div>
				<div v-if="xray" class="col-auto">
					<div class="btn-doc">
						<a
							href="https://progression.pages.dti.crosemont.quebec/documentation/contenu/cr%C3%A9action_de_conteu.html#org5fbcefb"
							target="_blank"
							class="btn-primary btn-sm"
						>?</a>
					</div>
				</div>
				<div class="col-auto">
					<div class="form-check form-switch btn-thème" présentation_étape="1.0">
						<input class="form-check-input" type="checkbox"
							   id="btn_thème"
							   name="btn_thème"
							   v-model="thèmeSombre" />
						<label class="form-check-label" for="btn_thème">🕶</label>
					</div>
				</div>
				<div class="col-auto">
					<div class="form-check form-switch btn-xray">
						<input class="form-check-input" type="checkbox"
							   id="btn_xray"
							   name="btn_xray"
							   v-model="xray" />
						<label class="form-check-label" for="btn_xray">Mode édition</label>
					</div>
				</div>
			</div>
		</div>
		<div class="container" style="padding-left: 0px; padding-right: 0px" >
				<div class="row align-items-end" style="height: 0px">
					<div class="col" ></div>
				<div class="col-auto" :class="classeIndicateur">●</div>
			</div>

			<div class="row" style="height: 500px" présentation_étape="1.1">
				<v-code-mirror
					id="editor"

						:value="code"
					:mode="mode"
					:theme="thème"
					:xray="xray"
					@update:value="onChange"
				/>
			</div>

			<div class="row align-items-end" style="height: 0px">
				<div class="col"></div>
				<div class="col-auto">
					<button
						id="btn_soumettre_tentative"
						type="button"
						class="btn btn-success btn-valider"
						:class="{tentative_en_cours: envoiEnCours}"
						:disabled="envoiEnCours"
						@click="validerTentative"
						présentation_étape="1.2"
					>➜</button>
				</div>
			</div>

		</div>
	</div>
</template>

<script src="./editeur.js"></script>

<style src="./editeur.css"></style>
