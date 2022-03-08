<template>
	<div>
		<div class="container" style="padding-left: 0px; padding-right: 0px" >
			<div class="row align-items-end" style="height: 0px">
				<div class="col-auto" v-if="rôleÉditeur">
					<div class="form-check form-switch btn-xray">
						<input class="form-check-input" type="checkbox"
							   id="btn_xray"
							   name="btn_xray"
							   v-model="xray" />
						<label class="form-check-label" for="btn_xray">Tout voir</label>
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
