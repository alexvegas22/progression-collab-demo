import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";
import SectionErreur from "@/components/question/section_erreurs/section_erreurs.vue";
import Rétroactions from "@/components/question/rétroactions/rétroactions.vue";
import Test from "@/components/question/test/test.vue";

export default {
	components: {
		Test,
		ResultatTest,
		SectionErreur,
		Rétroactions,
	},
	props: {
		panneauAffiché: Boolean,
	},
	emits: ["basculéPanneauTests"],
	data() {
		return {
			ongletActif: "ResultatTest",
			index_select: 0,
		};
	},
	mounted() {
		this.$mousetrap.bind("ctrl+alt+up", this.basculer_test_haut);
		this.$mousetrap.bind("ctrl+alt+down", this.basculer_test_bas);
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
			return this.tentative?.resultats
				? this.tentative.resultats[this.index_select]
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
	watch:{
		resultats(){
			if(this.tentative?.resultats){
				for(var resultat in this.tentative.resultats){
					if(this.tentative.resultats[resultat].sortie_erreur){
						this.index_select=resultat;
						this.changementOnglet("SectionErreur");
						break;
					}
					else if (!this.tentative.resultats[resultat].résultat){
						this.index_select=resultat;
						this.changementOnglet("ResultatTest");
						break;
					}
					this.changementOnglet("ResultatTest");
				}
			}
			else{
				this.index_select=0;
				this.changementOnglet("ResultatTest");
			}
		}
	},
	methods: {
		changementOnglet(onglet) {
			this.ongletActif = onglet;
		},
		select(index) {
			this.index_select = index;
			if(this.tentative?.resultats[index].sortie_erreur){
				this.changementOnglet("SectionErreur");
			}
			else{
				this.changementOnglet("ResultatTest");
			}
		},
		basculerPanneau(){
			this.$emit("basculéPanneauTests");
		},
		basculer_test_haut(){
			this.index_select--;
			if(this.index_select == -1) {
				this.index_select = this.$store.state.question.tests.length - 1;
			}
		},
		basculer_test_bas(){
			this.index_select = ( this.index_select + 1 ) % this.$store.state.question.tests.length;
		},
	},
};
