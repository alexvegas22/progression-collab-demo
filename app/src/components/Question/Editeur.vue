<template>
	<div class="division">
		<div>
			<prismEditor id="editor" class="my-editor" v-model="code" :highlight="highlighter" line-numbers> </prismEditor>
		</div>
		<button
			type="button"
			class="btn btn-success btn-valider p-3"
			style="margin-top: 15px; width: 100%"
			:disabled="envoiEnCours"
			@click="validerTentative"
		>
			Valider
		</button>
	</div>
	<div class="division retroaction-container d-none" id="retroaction">
		<ValidationTentative />
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

import ValidationTentative from "@/components/Question/ValidationTentative";

export default {
	props: ["uri", "username"],
	components: {
		ValidationTentative,
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
		// Dans cette fonction, la valeur du code et celle du langage sont mise à jour instantanéiment à chaque modification dans l'éditeur
		highlighter(code) {
			// prend le langage sélectionné par l'utilisateur et retourne les highlights
			return highlight(code, languages[this.langage]);
		},
		validerTentative() {
			this.$store.dispatch("soumettreTentative", {
				langage: this.langage,
				code: this.code,
				username: this.username,
				uri: this.uri,
			});
			var element = document.getElementById("retroaction");
			element.classList.remove("d-none");
		},
	},
	computed: {
		ebauches() {
			return this.$store.state.question.ebauches;
		},
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
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
.division {
	width: 50%;
	height: auto;
	float: left;
	margin: 0px 20px;
	flex-grow: 1;
}
.btn-valider {
	box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}
.retroaction-container {
	border: solid 1px black;
	border-radius: 4px;
}
/* optional class for removing the outline */
.prism-editor__textarea:focus {
	outline: none;
}
.my-editor pre {
	color: #f6f6f6;
}
</style>
