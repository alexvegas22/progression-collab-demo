<template>
	<div class="container" style="padding-left: 0px; padding-right: 0px" >
		<div class="row align-items-end" style="height: 0px">
			<div class="col" ></div>
			<div class="col-auto" :class="classeIndicateur">●</div>
		</div>
		
		<div class="row">
			<v-code-mirror
				id="editor"
					v-model:value="code"
				:mode="mode"
				theme="monokai"
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
</template>

<script src="./editeur.js"></script>

<style src="./editeur.css"></style>
