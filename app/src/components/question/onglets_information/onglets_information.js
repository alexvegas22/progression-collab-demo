import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";
import ErreursTest from "@/components/question/section_erreurs/section_erreurs.vue";
import DétailsTest from "@/components/question/section_details/section_details.vue";
import Rétroactions from "@/components/question/rétroactions/rétroactions.vue";
import Test from "@/components/question/test/test.vue";
import BoutonSoumission from "@/components/question/bouton_soumission/boutonSoumission.vue";
import Diptyque from "@/components/diptyque/diptyque.vue";

export default {
	components: {
		Test,
		BoutonSoumission,
		ResultatTest,
		ErreursTest,
		Rétroactions,
		DétailsTest,
		Diptyque,
	},
	data() {
		return {
			ongletActif: "ResultatTest",
			index_select: 0,
			modeAffichageChangéRaccourci: false,
			testsInitiaux: [],
		};
	},
	emits: ["validerTentative"],
	computed: {
		raccourcis() {
			return this.$store.state.raccourcis;
		},
		resultats() {
			return this.$store.getters.résultats;
		},
		question_type() {
			return this.$store.getters.question_type;
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
			return this.$store.state.question?.tests;
		},
		thèmeSombre() {
			return this.$store.getters.thèmeSombre;
		},
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
		envoiTestUnique(){
			return this.tests?.filter( t => t?.envoyé!=null).length > 0;
		}
	},
	watch:{
		resultats(){
			if(!this.envoiTestUnique){
				for(var resultat in this.tentative?.resultats){
					if(this.tentative.resultats[resultat]?.sortie_erreur){
						this.index_select=resultat;
						this.changerOnglet("ErreursTest");
						break;
					}
					else if (!this.tentative.resultats[resultat]?.résultat){
						this.index_select=resultat;
						this.changerOnglet("ResultatTest");
						break;
					}
					this.changerOnglet("ResultatTest");
				}
			}
		},
		envoiEnCours: {
			deep: true,
			handler: function(){
				if(this.envoiEnCours === true){
					this.$store.dispatch("réinitialiserTests");
				}
			}
		},
		index_select() {
			this.select(this.index_select);
		}
	},
	methods: {
		changerOnglet( onglet ){
			this.ongletActif = onglet;
		},
		itérerOnglets(direction) {
			if( direction > 0 ) {
				if(this.resultat_select){
					if(this.ongletActif === "ResultatTest") {
						if(this.resultat_select.sortie_erreur){
							this.ongletActif = "ErreursTest";
						}
						else{
							this.ongletActif = "DétailsTest";
						}
					}
					else if(this.ongletActif === "ErreursTest"){
						this.ongletActif = "DétailsTest";
					}
					else {
						this.ongletActif = "ResultatTest";
					}
				}
			}
			else {
				if(this.resultat_select){
					if(this.ongletActif === "ResultatTest") {
						if(this.resultat_select.temps_exécution){
							this.ongletActif = "DétailsTest";
						}
						else if(this.resultat_select.sortie_erreur){
							this.ongletActif = "ErreursTest";
						}
					}
					else if(this.ongletActif === "ErreursTest"){
						this.ongletActif = "ResultatTest";
					}
					else {
						if(this.resultat_select.sortie_erreur){
							this.ongletActif = "ErreursTest";
						}
						else{
							this.ongletActif = "ResultatTest";
						}
					}
				}
			}
		},
		select(index) {
			this.index_select = index;
			if(this.ongletActif === "ErreursTest" && !this.tentative?.resultats[index]?.sortie_erreur){
				this.changerOnglet("ResultatTest");
			}
			if(this.ongletActif === "DétailsTest" && !this.tentative?.resultats[index]?.temps_exécution){
				this.changerOnglet("ResultatTest");
			}
		},
		basculerTestHaut(){
			this.index_select--;
			if(this.index_select == -1) {
				this.index_select = this.$store.state.question.tests.length - 1;
			}
			this.select( this.index_select );
		},
		basculerTestBas(){
			this.index_select = ( this.index_select + 1 ) % this.$store.state.question.tests.length;
			this.select( this.index_select );
		},
		validerTestSélectionné(){
			this.validerTest(this.index_select);
		},
		validerTest(index){
			if(this.envoiEnCours || this.tests[index]?.envoyé ) return;

			this.tests[index].envoyé = true;
			const test_sélectionné = this.tests[index];
			this.$store.dispatch("setRésultats", []);

			this.$store.dispatch("soumettreTestUnique", {
				test: {
					entrée: test_sélectionné.entrée,
					params: test_sélectionné.params,
				},
				index: index,
			}).then( () => {
				if(this.tentative.resultats[index]?.sortie_erreur){
					this.index_select=index;
					this.changerOnglet("ErreursTest");
				}
			}).finally( () => {
				this.tests[index].envoyé = false;
			});
		},
	},
};
