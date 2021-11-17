<template>
	<div>
		<div class="container" style="padding-left: 0px; padding-right: 0px" >
			<div class="row align-items-end" style="height: 0px">
				<div class="col"></div>
				<div class="col-auto">
					<div class="form-check form-switch btn-thème">
						<input class="form-check-input" type="checkbox"
							   id="btn_thème"
							   name="btn_thème"
							   v-model="thèmeSombre" />
						<label class="form-check-label" for="btn_thème">🕶</label>
					</div>
				</div>
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
			
			<div class="row" style="height: 500px">
				<v-code-mirror
					id="editor"
						v-model:value="code"
					:mode="mode"
					:theme="thème"
					:xray="xray"
				/>
			</div>
			
			<div class="row align-items-end" style="height: 0px">
				<div class="col"></div>
				<div class="col-auto">
					<button
						type="button"
						class="btn btn-success btn-valider"
						:class="{tentative_en_cours: envoiEnCours}"
						:disabled="envoiEnCours"
						@click="validerTentative"
					>➜</button>
				</div>
			</div>
			
		</div>	
	</div>
</template>

<script src="./editeur.js"></script>

<style src="./editeur.css"></style>
