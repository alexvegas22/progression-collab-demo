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
