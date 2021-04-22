<template>
	<label for="langages">{{ $t("editeur.langageÉbauche") }}</label>
	<select name="langages" id="langages" style="margin-left: 10px; width: 250px; text-align: center" v-model="selected">
		<option v-if="Object.keys(this.ebauches).length === 0" disabled selected>{{ $t("editeur.choixLangage") }}</option>
		<option v-else disabled>{{ $t("editeur.choixLangage") }}</option>
		<option
			v-for="langage in Object.keys(this.ebauches)"
			v-bind:key="langage"
			v-on:click="this.chargerEbaucheParLangage(langage)"
		>
			{{ langage }}
		</option>
	</select>
	<div>
		<v-ace-editor
			id="editor"
			name="editor"
			v-model:value="this.code"
			style="height: 300px"
			@init="editorInit"
			lang="python"
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
