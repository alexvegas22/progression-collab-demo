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
			get: function () {
				return this.$store.state.tentative.code
			},
			set: function (texte) {
				this.$store.dispatch("mettreAjourCode", texte)
			}
		},
		langage() {
			return this.$store.state.tentative.langage
		},
		ebauches() {
			return this.$store.state.question.ebauches ?? []
		},
		tentative() {
			return this.$store.state.tentative
		},
	},
	watch: {
		tentative: function () {
			console.log("tentative update ------------")
			var select = document.getElementById("langages")
			const existe = (elem) => elem == this.langage;
			const indexLangageActuel = Object.keys(this.ebauches).findIndex(existe)
			if(select.children.length >= Object.keys(this.ebauches).length){
				select.children[indexLangageActuel + 1].selected = true
			}
		},
	},
	methods: {
		editorInit: function () {
			require("brace/ext/language_tools")
			require("brace/mode/html")
			require("brace/mode/python")
			require("brace/mode/less")
			require("brace/theme/monokai")
		},
		reinitialiserCodeEditeur() {
			const msgAvertissement = "Êtes-vous sûr de vouloir réinitialiser?"
			if (confirm(msgAvertissement) == true) {
				this.$store.dispatch("mettreAjourCode", this.$store.state.question.ebauches[this.langage].code);
			}
		},
		chargerEbaucheParLangage(unLangage) {
			this.$store.dispatch("mettreAjourLangageSelectionne", unLangage)
			this.reinitialiserCodeEditeur()
		},
	}
};
