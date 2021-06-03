<template>
	<div class="container">
		<div :class="classeIndicateur">*</div>
		
		<div class="row">
			<v-code-mirror
				id="editor"
					v-model:value="code"
				:mode="mode"
				theme="monokai"
			/>
		</div>
		
		<div class="row" style="float: right">
			<button
				type="button"
					  class="btn btn-success btn-valider"
					  :class="{tentative_en_cours: envoiEnCours}"
				:disabled="envoiEnCours"
				@click="validerTentative"
			>
				➜
			</button>
		</div>
		
	</div>	
</template>

<script src="./editeur.js"></script>

<style src="./editeur.css"></style>
