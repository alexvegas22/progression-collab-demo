import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";
import ErreursTest from "@/components/question/section_erreurs/section_erreurs.vue";
import DétailsTest from "@/components/question/section_details/section_details.vue";
import Rétroactions from "@/components/question/rétroactions/rétroactions.vue";
import Test from "@/components/question/test/test.vue";
import Diptyque from "@/components/diptyque/diptyque.vue";

import {copie_profonde} from "@/util/commun.js";

export default {
	components: {
		Test,
		ResultatTest,
		ErreursTest,
		Rétroactions,
		DétailsTest,
		Diptyque,
	},
	props: {
		ongletChangé: Boolean,
		testSélectionnéHaut: Boolean,
		testSélectionnéBas: Boolean,
	},
	data() {
		return {
			ongletActif: "ResultatTest",
			index_select: 0,
			modeAffichageChangéRaccourci: false,
			envoiTestUnique: false,
			index_envoi_unique: 0,
			testsInitiaux: [],
		};
	},
	mounted() {
		this.testsInitiaux =  copie_profonde(this.$store.state.question.tests);
	},
	computed: {
		resultats() {
			if(!this.$store.state.question || !this.$store.state.tentative?.resultats) return [];
			var res = [];
			for (var i = 0; i < this.$store.state.question.tests.length; i++) {
				var résultat = this.tentative?.resultats[i]?.résultat;
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
			return this.$store.getters.thèmeSombre;
		},
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
	watch:{
		resultats(){
			if(!this.envoiTestUnique){
				for(var resultat in this.tentative?.resultats){
					if(this.tentative.resultats[resultat]?.sortie_erreur){
						this.index_select=resultat;
						this.changementOnglet("ErreursTest");
						break;
					}
					else if (!this.tentative.resultats[resultat]?.résultat){
						this.index_select=resultat;
						this.changementOnglet("ResultatTest");
						break;
					}
					this.changementOnglet("ResultatTest");
				}
			}
			this.envoiTestUnique = false;
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
		envoiEnCours: {
			deep: true,
			handler: function(){
				if(this.envoiEnCours === true){
					this.réinitialiserTests();
				}
			}
		},
	},
	methods: {
		changementOnglet(onglet) {
			this.ongletActif = onglet;
		},
		select(index) {
			this.index_select = index;
			if(this.ongletActif === "ErreursTest" && !this.tentative?.resultats[index]?.sortie_erreur){
				this.changementOnglet("ResultatTest");
			}
			if(this.ongletActif === "DétailsTest" && !this.tentative?.resultats[index]?.temps_exec){
				this.changementOnglet("ResultatTest");
			}
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
		validerTest(index){
			this.index_envoi_unique = index;
			this.envoiTestUnique = true;
			this.$store.dispatch("soumettreTestUnique",
				{
					test: this.tests[index],
					index: index,
				}
			);
		},
		réinitialiserTests(){
			this.$store.dispatch("setTests", copie_profonde(this.testsInitiaux));
			this.$store.dispatch("setRésultats", []);
		},
	},
};
