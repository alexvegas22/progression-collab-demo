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
				chaîne = chaîne.replaceAll(" ", '<span class="modeVisuel">_</span>');
				chaîne = chaîne.replaceAll("\n", '<span class="modeVisuel">↵\n</span>');
				chaîne = chaîne.replaceAll("\r", '<span class="modeVisuel">↵\n</span>');
			} else {
				chaîne = chaîne.replaceAll('<span class="modeVisuel">_</span>', " ");
				chaîne = chaîne.replaceAll('<span class="modeVisuel">↵\n</span>', "\n");
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
