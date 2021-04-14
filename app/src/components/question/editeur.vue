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
</template>

<script src="./editeur.js"></script>

<style src="./editeur.css"></style>
