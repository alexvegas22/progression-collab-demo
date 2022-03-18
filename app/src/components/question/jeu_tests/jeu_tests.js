import Test from "@/components/question/test/test.vue";
import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";
import SélecteurModeAffichage from "@/components/question/sélecteur_mode_affichage/sélecteur_mode_affichage.vue";
import TabNav from "@/components/question/onglets/TabNav.vue";
import Tab from "@/components/question/onglets/Tab.vue";
import Rétroaction from "@/components/question/rétroactions/rétroaction.vue";

export default {
	components: { Test, ResultatTest, SélecteurModeAffichage, TabNav, Tab, Rétroaction },
	name: "JeuTests",
	computed: {
		tests() {
			return this.$store.state.question.tests;
		},
		tentative() {
			return this.$store.state.retroactionTentative;
		},
		resultats() {
			var res = [];
			for (var i = 0; i < this.$store.state.question.tests.length; i++) {
				var résultat =
					this.tentative && this.tentative.resultats && i < this.tentative.resultats.length
						? this.tentative.resultats[i].résultat
						: null;
				res.push(résultat);
			}
			return res;
		},
		feedbacks_label() {
			return Object.keys(this.test_select.feedback);
		},
		feedbacks_valeur() {
			return Object.values(this.test_select.feedback);
		},
		test_select() {
			return this.$store.state.question.tests[this.index_select];
		},
		resultat_select() {
			return this.tentative && this.tentative.resultats
				? this.$store.state.retroactionTentative.resultats[this.index_select]
				: null;
		},
		
	},
	data() {
		return {
			index_select: 0,
			selected: 'Résultats',
		};
	},
	methods: {
		select: function (index) {
			this.index_select = index;
		},
		setSelected(tab) {
			this.selected = tab;
		},
		feedback_select: function (index) {
			let feedback = this.$store.state.question.tests[this.index_select].feedback;
			switch (index) {
				case 0:
					if (feedback.positive == null) {
						this.$store.state.question.tests[this.index_select].feedback.positive = "";
					}
					break;

				case 1:
					if (feedback.négative == null) {
						this.$store.state.question.tests[this.index_select].feedback.négative = "";
					}					
					break;

				case 2:
					if (feedback.erreur == null) {
						this.$store.state.question.tests[this.index_select].feedback.erreur = "";
					}
					break;

			}
			return this.feedbacks_valeur[index] != null ? this.feedbacks_valeur[index] : "";
		},
	},
};
