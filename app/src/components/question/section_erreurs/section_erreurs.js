import Ampoule from "@/components/question/ampoule/ampoule.vue";
import FenêtreInfo from "@/components/layouts/fenetre_info.vue";
import PanneauMinMax from "@/components/panneau_minmax/panneau_minmax.vue";
export default {
	components: {Ampoule, FenêtreInfo, PanneauMinMax},
	props: {
		test: null,
		résultat: null,
		panneauAffiché: null,
	},
};
