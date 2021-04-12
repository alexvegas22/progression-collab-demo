<template>
	<div>
		<prismEditor id="editor" class="my-editor" v-model="code" :highlight="highlighter" line-numbers> </prismEditor>
	</div>
</template>

<script src="./editeur.js"></script>

<style src="./editeur.css"></style>
