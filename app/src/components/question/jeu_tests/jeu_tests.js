import Test from "@/components/question/test/test.vue";
import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";
import SélecteurModeAffichage from "@/components/question/sélecteur_mode_affichage/sélecteur_mode_affichage.vue";

export default {
	components: { Test, ResultatTest, SélecteurModeAffichage  },
	name: "JeuTests",
	computed: {
		tests() {
			return this.$store.state.question.tests
		},
		resultats() {
			var res=[];
			for(var i=0; i<this.$store.state.question.tests.length; i++){
				var tentative = this.$store.state.retroactionTentative;
				var résultat = (tentative && i<tentative.resultats.length) ? tentative.resultats[i].résultat : null;
				res.push( résultat );
			}
			return res;
		},
		test_select(){
			return this.$store.state.question.tests[this.index_select];
		},
		resultat_select() {
			return this.$store.state.retroactionTentative ? this.$store.state.retroactionTentative.resultats[this.index_select] : null;
		},
	},
	data() {
		return {
			index_select:0
		}
	},
	methods: {
		select: function(index){
			this.index_select=index;
		}
	}
};
