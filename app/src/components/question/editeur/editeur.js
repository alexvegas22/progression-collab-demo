import { VAceEditor } from "vue3-ace-editor";
import brace from "brace";
import "brace/mode/python";
import "brace/theme/monokai";

export default {
	components: {
		VAceEditor
	},
	computed: {
		code: {
			get: function() {
				return this.$store.state.tentative.code;
			},
			set: function(texte) {
				this.$store.dispatch("mettreAjourCode", texte);
			}
		},
		langage() {
			return this.$store.state.tentative.langage;
		}
	},
	methods: {
		editorInit: function() {
			require("brace/ext/language_tools");
			require("brace/mode/html");
			require("brace/mode/python");
			require("brace/mode/less");
			require("brace/theme/monokai");
		},
		reinitialiserCodeEditeur() {
			const codeEbauche = this.$store.state.question.ebauches[this.langage].code
			this.$store.dispatch("mettreAjourCode", codeEbauche);
		},
	}
};
