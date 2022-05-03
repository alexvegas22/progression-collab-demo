import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";
import ErreursTest from "@/components/question/section_erreurs/section_erreurs.vue";
import DétailsTest from "@/components/question/section_details/section_details.vue";
import Rétroactions from "@/components/question/rétroactions/rétroactions.vue";
import Test from "@/components/question/test/test.vue";

export default {
	components: {
		Test,
		ResultatTest,
		ErreursTest,
		Rétroactions,
		DétailsTest
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
			if(!this.$store.state.question || !this.$store.state.tentative) return [];
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
			return this.$store.state.tentative;
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
			if(this.tentative?.resultats.length > 0){
				for(var resultat in this.tentative.resultats){
					if(this.tentative.resultats[resultat].sortie_erreur){
						this.index_select=resultat;
						this.changementOnglet("ErreursTest");
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
				if(this.resultat_select){
					if(this.ongletActif === "ResultatTest") {
						if(this.resultat_select.sortie_erreur){
							this.changementOnglet("ErreursTest");
						}
						else{
							this.changementOnglet("DétailsTest");
						}
					}
					else if(this.ongletActif === "ErreursTest"){
						this.changementOnglet("DétailsTest");
					}
					else {
						this.changementOnglet("ResultatTest");
					}
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
	},
};
