import tableauExercices from "@/components/accomplissements/tableauExercices/tableauExercices.vue";
import graphiqueStatistiques from "@/components/accomplissements/statistiquesParLangage/statistiquesParLangage.vue";
import graphiqueStatistiquesParDifficulté from "@/components/accomplissements/statistiquesParDifficulté/statistiquesParDifficulté.vue";
export default {
	name: "Accomplissements",
	components: {
		tableauExercices,
		graphiqueStatistiques,
		graphiqueStatistiquesParDifficulté,
	},
	computed: {
		username(){
			return this.$store.state.username;
		},
		avancements(){
			return this.$store.state.user?.avancements && Object.keys(this.$store.state.user?.avancements).length>0;
		},
		démos() {
			return this.$store.getters.démos;
		},
	},
	methods: {
		fermerDémos() {
			this.$store.dispatch("setPréférences", {
				démos: false,
			});
		},
		ouvrirQuestion( uri, demo ){
			this.$store.dispatch("setTokenRessources", null);
			this.$store.dispatch("setCallbackSucces", null);
			this.$store.dispatch("setCallbackSuccesParams", null);

			this.$router.push( {
				name: "Question",
				query: {
					uri: uri,
					demo: demo,
				}
			});
		}
	}
};
