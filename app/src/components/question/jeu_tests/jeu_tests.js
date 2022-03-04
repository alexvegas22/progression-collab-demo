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
	data() {
		return {
			nouveauTestNom: "",
			index_select: 0,
			modifiable: false
		};
	},
	methods: {
		select: function (index) {
			this.index_select = index;
		},
		montrerAjouterTest: function () {
			this.modifiable = !this.modifiable;
		},
		AjouterTest: function () {
			var lesTests = this.$store.state.question.tests;
			let nouveauTest = {
				nom: this.nouveauTestNom,
				entrée: "",
				sortie_attendue: "",
				params: "",

			}
			lesTests.push(nouveauTest);
			this.select(lesTests.length - 1);
		}
	},
};
