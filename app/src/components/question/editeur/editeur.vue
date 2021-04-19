<template>
	<label for="langages">Langage de l'ébauche : </label>
	<select name="langages" id="langages" style="margin-left: 10px; width: 250px; text-align: center">
		<option v-if="Object.keys(this.ebauches).length === 0" disabled selected>-- Choisis ton langage --</option>
		<option v-else disabled>-- Choisis ton langage --</option>
		<option
			v-for="langage in Object.keys(this.ebauches)"
			v-bind:key="langage"
			v-on:click="this.chargerEbaucheParLangage(langage)"
			id="{{langage}}"
			value="{{langage}}"
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
	<button type="button" class="btn btn-info btn-reset p-3" style="margin-top: 15px" @click="this.reinitialiserCodeEditeur()">
		Réinitialiser
	</button>
</template>

<script src="./editeur.js"></script>

<style src="./editeur.css"></style>
