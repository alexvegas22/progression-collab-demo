import Test from "@/components/question/test/test.vue";

export default {
	components: { Test },
	name: "JeuTests",
	computed: {
		tests() {
			return this.$store.state.question.tests;
		},
		resultats() {
			return this.$store.state.retroactionTentative ? this.$store.state.retroactionTentative.resultats : [];
		},
		data: {
			modeVisuel: false,
		},
	},
	methods: {
		remplacerCaractèresVisuels(chaîne) {
			if (!chaîne) {
				return;
			}

			if (this.modeVisuel) {
				chaîne = chaîne.replace(/ /g, '<span class="modeVisuel">_</span>');
				chaîne = chaîne.replace(/\r|\n/g, '<span class="modeVisuel">↵\n</span>');
			} else {
				chaîne = chaîne.replace(/<span class="modeVisuel">_<\/span>/g, " ");
				chaîne = chaîne.replace(/<span class="modeVisuel">↵\n<\/span>/g, "\n");
			}
			return chaîne;
		},
		changerModeComparaison() {
			this.modeVisuel = !this.modeVisuel;
			for (let i = 0; i < this.resultats.length; i++) {
				this.resultats[i].sortie_observée = this.remplacerCaractèresVisuels(this.resultats[i].sortie_observée);
				this.tests[i].sortie_attendue = this.remplacerCaractèresVisuels(this.tests[i].sortie_attendue);
			}
		},
	},
};
