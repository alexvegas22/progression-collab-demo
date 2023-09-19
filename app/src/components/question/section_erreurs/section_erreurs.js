import Ampoule from "@/components/question/ampoule/ampoule.vue";
import FenêtreInfo from "@/components/layouts/fenetre_info.vue";
export default {
	components: {Ampoule, FenêtreInfo},
	props: {
		test: null,
		résultat: null,
		panneauAffiché: null,
	},
};
