<template>
	<div>
		<v-ace-editor id="editor" name="editor"
			v-model:value="code"
			style="height: 300px"
			@init="editorInit" 
			lang="python" 
			theme="monokai"
		/>
	</div>
	<button
		type="button"
		class="btn btn-info btn-reset p-3"
		style="margin-top: 15px;"
		@click="reinitialiserCodeEditeur"
	>
		Réinitialiser
	</button>
</template>

<script src="./editeur.js"></script>

<style src="./editeur.css"></style>
