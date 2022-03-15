import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";
import SectionErreur from "@/components/question/section_erreurs/section_erreurs.vue";
import Commentaires from "@/components/question/commentaires/commentaires.vue";
import Test from "@/components/question/test/test.vue";

export default {
	components: {
		Test,
		ResultatTest,
		SectionErreur,
		Commentaires,
	},
	props: ["afficherPanneau"],
	data() {
		return {
			sectionVisible: true,
			ongletActif: "resultat-test",
			index_select: 0,
		};
	},
	computed: {
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
		tentative() {
			return this.$store.state.retroactionTentative;
		},
		tests() {
			return this.$store.state.question.tests;
		},
		thèmeSombre() {
			return this.$store.state.thèmeSombre;
		},
	},
	methods: {
		changementOnglet(onglet) {
			this.ongletActif = onglet;
			this.sectionVisible = true;
		},
		select(index) {
			this.index_select = index;
		},
	},
};