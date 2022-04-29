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
};