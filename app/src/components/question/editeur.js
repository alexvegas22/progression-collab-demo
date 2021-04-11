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
			if (!this.afficherTentative) {
				if (this.tentatives.length > 0) {
					this.code = this.tentatives[this.tentatives.length - 1].code;
					this.langage = this.tentatives[this.tentatives.length - 1].langage;
				} else {
					this.code = this.ebauches["python"].code;
					this.langage = this.ebauches["python"].langage;
				}
			} else {
				this.code = this.ebauches["python"].code;
				this.langage = this.ebauches["python"].langage;
				this.$store.commit("setAfficherTentative", false);
			}
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
				code: this.code,
				langage: this.langage,
			});
			return highlight(this.code, languages[this.langage]);
		},
	},
	computed: {
		ebauches() {
			return this.$store.state.question.ebauches;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives;
		},
		afficherTentative() {
			return this.$store.state.afficherTentative;
		},
	},
};
