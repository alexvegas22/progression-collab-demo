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
		ongletChangé: Boolean,
		testSélectionnéHaut: Boolean,
		testSélectionnéBas: Boolean,
	},
	emits: ["basculéPanneauTests"],
	data() {
		return {
			ongletActif: "ResultatTest",
			index_select: 0,
			modeAffichageChangéRaccourci: false,
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
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
	watch:{
		resultats(){
			if(this.tentative?.resultats.length > 0){
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
		},
		ongletChangé: {
			deep: true,
			handler: function(){
				if(this.ongletActif === "ResultatTest") {
					this.changementOnglet("SectionErreur");
				}
				else {
					this.changementOnglet("ResultatTest");
				}
			}
		},
		testSélectionnéHaut: {
			deep: true,
			handler: function(){
				this.basculerTestHaut();
			}
		},
		testSélectionnéBas: {
			deep: true,
			handler: function(){
				this.basculerTestBas();
			}
		},
	},
	methods: {
		changementOnglet(onglet) {
			this.ongletActif = onglet;
		},
		select(index) {
			this.index_select = index;
			if(this.tentative.resultats){
				if(this.tentative?.resultats[index].sortie_erreur){
					this.changementOnglet("SectionErreur");
				}
				else{
					this.changementOnglet("ResultatTest");
				}
			}
		},
		basculerPanneau(){
			this.$emit("basculéPanneauTests");
		},
		basculerTestHaut(){
			this.index_select--;
			if(this.index_select == -1) {
				this.index_select = this.$store.state.question.tests.length - 1;
			}
		},
		basculerTestBas(){
			this.index_select = ( this.index_select + 1 ) % this.$store.state.question.tests.length;
		},
		validerTest(){
			this.$store.dispatch("soumettreTestUnique",
				{
					langage: this.$store.state.tentative.langage,
					code: this.$store.state.tentative.code,
					test: this.test_select,
					index: this.index_select,
				}
			);
		}
	},
};