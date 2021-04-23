<template>
	<label for="langages">Langage de l'ébauche : </label>
	<select name="langages" id="langages" style="margin-left: 10px; width: 250px; text-align: center" v-model="selected">
		<option v-if="Object.keys(this.ebauches).length === 0" disabled selected>-- Choisis ton langage --</option>
		<option v-else disabled>-- Choisis ton langage --</option>
		<option
			v-for="langage in Object.keys(this.ebauches)"
			v-bind:key="langage"
			v-on:click="this.chargerEbaucheParLangage(langage)"
		>
			{{ langage }}
		</option>
	</select>
	<div>
		<v-code-mirror
			id="editor"
			:value="this.code"
			:mode="selected"
			theme="monokai"
		/>
	</div>
	<button type="button" class="btn btn-info btn-reset p-3" style="margin-top: 15px" @click="this.reinitialiserCodeEditeur()">
		Réinitialiser
	</button>
</template>

<script src="./editeur.js"></script>

<style src="./editeur.css"></style>
