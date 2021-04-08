<template>
	<div>
		<prismEditor id="editor" class="my-editor" v-model="code" :highlight="highlighter" line-numbers> </prismEditor>
	</div>
</template>

<script>
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/themes/prism-dark.css";

// Imports des languages
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";

export default {
	components: {
		PrismEditor,
	},
	// À chaque fois que l'ébauche change, on met à jour le code et le langage
	watch: {
		ebauches: function () {
			this.code = this.ebauches["python"].code;
			this.langage = this.ebauches["python"].langage;
		},
	},
	data: () => ({
		code: "",
		langage: "python",
	}),
	methods: {
		/**
		 * Dans cette fonction, la valeur du code et celle du langage sont mise à jour instantanéiment à chaque modification dans l'éditeur
		 * Ensuite, elle prend le langage sélectionné par l'utilisateur et retourne les highlights
		 */
		highlighter(code) {
			this.$store.dispatch("raffraichirValeursEbauches", {
				code: code,
				langage: this.langage,
			});
			return highlight(code, languages[this.langage]);
		},
	},
	computed: {
		ebauches() {
			return this.$store.state.question.ebauches;
		},
	},
};
</script>

<style>
.my-editor {
	/* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
	background: #2d2d2d;
	color: #ccc;
	height: 100%;
	/* you must provide font-family font-size line-height. Example: */
	font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
	font-size: 14px;
	line-height: 1.5;
	padding: 5px;
}
/* optional class for removing the outline */
.prism-editor__textarea:focus {
	outline: none;
}
.my-editor pre {
	color: #f6f6f6;
}
</style>
