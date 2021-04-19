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
		tentatives() {
			return this.$store.state.avancement.tentatives ?? [];
		},
		langageDerniereTentative() {
			return this.$store.state.langageDerniereTentative;
		},
	},
	watch: {
		tentative: function () {
			console.log("Tentative a changé")
			var select = document.getElementById("langages")
			const existe = (elem) => elem == this.langage;
			const indexLangageActuel = Object.keys(this.ebauches).findIndex(existe)
			if (select.children.length >= Object.keys(this.ebauches).length) {
				select.children[indexLangageActuel + 1].selected = true
			}
		},
		langageDerniereTentative: function () {
			console.log("langageDerniereTentative a changé")
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
			var tentativeExiste = false
			if (this.tentatives.length > 0) {
				this.tentatives.forEach((uneTentative) => {
					if (!tentativeExiste && (uneTentative.langage == unLangage)) {
						this.$store.dispatch("mettreAjourCode", uneTentative.code);
						tentativeExiste = true
					}
				});
			}
			if (!tentativeExiste) {
				this.$store.dispatch("mettreAjourCode", this.$store.state.question.ebauches[this.langage].code);
			}
		},
		test(){
			if(1 === 0){
				return "AAA"
			}
		},
	}
};
