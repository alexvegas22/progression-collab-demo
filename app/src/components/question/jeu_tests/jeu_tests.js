import Test from "@/components/question/test/test.vue";
import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";
import SélecteurModeAffichage from "@/components/question/sélecteur_mode_affichage/sélecteur_mode_affichage.vue";

export default {
	components: { Test, ResultatTest, SélecteurModeAffichage },
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
		test_select() {
			return this.$store.state.question.tests[this.index_select];
		},
		resultat_select() {
			return this.tentative && this.tentative.resultats
				? this.$store.state.retroactionTentative.resultats[this.index_select]
				: null;
		},
	},
	mounted() {
		this.$mousetrap.bind('ctrl+alt+up', this.basculer_test_haut);
		this.$mousetrap.bind('ctrl+alt+down', this.basculer_test_bas);
	},
	data() {
		return {
			index_select: 0,
		};
	},
	methods: {
		select: function (index) {
			this.index_select = index;
		},
		basculer_test_haut(){
			this.index_select--;
			if(this.index_select == -1) {
				this.index_select = this.$store.state.question.tests.length - 1;
			}
		},
		basculer_test_bas(){
			this.index_select++;
			if(this.index_select == this.$store.state.question.tests.length) {
				this.index_select = 0;
			}
		},
	},
};
