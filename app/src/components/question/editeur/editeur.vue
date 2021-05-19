<template>
	<label for="langages">{{ $t("editeur.langageÉbauche") }}</label>
	<select name="langages" id="langages" style="margin-left: 10px; width: 250px; text-align: center"
			v-model="langageSélectionné"
			v-on:change="this.chargerEbaucheParLangage()"
	>
		<option v-if="Object.keys(this.ebauches).length === 0" disabled selected>{{ $t("editeur.choixLangage") }}</option>
		<option v-else disabled>{{ $t("editeur.choixLangage") }}</option>
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
	<button
		type="button"
		class="btn btn-info btn-reset p-3"
		style="margin-top: 15px"
		@click="this.reinitialiserCodeEditeur()"
	>
		{{ $t("editeur.réinitialiser") }}
	</button>
</template>

<script src="./editeur.js"></script>

<style src="./editeur.css"></style>
