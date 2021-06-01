<template>
	<label for="langages">{{ $t("editeur.langageÉbauche") }}</label>
	<select name="langages" id="langages" style="margin-left: 10px; width: 250px; text-align: center"
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
	<div :class="classeIndicateur">*</div>
	<div>
		<v-code-mirror
			id="editor"
				v-model:value="code"
			:mode="langageSélectionné"
			theme="monokai"
		/>
	</div>

	<div style="position: relative; top: -45px">

		<button
			type="button"
			class="btn btn-info btn-reset"
			@click="this.reinitialiserCodeEditeur()"
		>
			⟲
		</button>

			<button
				type="button"
					  class="btn btn-success btn-valider"
					  :disabled="envoiEnCours"
				@click="validerTentative"
			>
		➜
	</button>
	</div>
</template>

<script src="./editeur.js"></script>

<style src="./editeur.css"></style>
