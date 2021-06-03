<template>
	<div class="container">
		<div class="row">
			<div class="col-6">
				<label for="langages">{{ $t("editeur.langageÉbauche") }}</label>
				<select name="langages" id="langages" style="text-align: left"
							  v-model="langageSélectionné"
							  v-on:change="this.chargerEbaucheParLangage()"
				>
					<option
						v-for="langage in Object.keys(this.ebauches)"
						v-bind:key="langage"
					>
						{{ langage }}
					</option>
				</select>
			</div>
		</div>
		
		<div :class="classeIndicateur">*</div>
		
		<div class="row">
			<v-code-mirror
				id="editor"
					v-model:value="code"
				:mode="langageSélectionné"
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
