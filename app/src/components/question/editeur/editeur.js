import { VCodeMirror } from "./VCodeMirror";

export default {
	components: {
		VCodeMirror,
	},
	data() {
		return {
			selected: "",
		};
	},
	computed: {
		code: {
			get: function () {
				return this.$store.state.tentative.code;
			},
			set: function (texte) {
				this.$store.dispatch("mettreAjourCode", texte);
			},
		},
		ebauches() {
			return this.$store.state.question.ebauches ?? [];
		},
		tentative() {
			return this.$store.state.tentative;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives ?? [];
		},
	},
	mounted() {
		if (this.tentative) {
			this.selected = this.tentative.langage;
		}
	},
	watch: {
		tentative: function () {
			this.selected = this.tentative.langage;
		},
	},
	methods: {
		reinitialiserCodeEditeur() {
			const msgAvertissement = "Êtes-vous sûr de vouloir réinitialiser?";
			if (confirm(msgAvertissement) == true) {
				this.$store.dispatch("réinitialiser", this.tentative.langage);
			}
		},
		chargerEbaucheParLangage() {
			this.$store.dispatch("mettreAjourLangageSelectionne", this.selected);
			var tentativeExiste = false;
			if (this.tentatives.length > 0) {
				this.tentatives.forEach((uneTentative) => {
					if (!tentativeExiste && uneTentative.langage == unLangage) {
						this.$store.dispatch("mettreAjourCode", uneTentative.code);
						tentativeExiste = true;
						return; //break le forEach
					}
				});
			}
			if (!tentativeExiste) {
				this.$store.dispatch("réinitialiser", this.tentative.langage);
			}
		},
	},
};
