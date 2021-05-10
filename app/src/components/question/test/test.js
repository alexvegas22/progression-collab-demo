import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";
import SélecteurModeAffichage from "@/components/question/sélecteur_mode_affichage/sélecteur_mode_affichage.vue";

export default {
	components: { ResultatTest, SélecteurModeAffichage },
	name: "Test",
	props: {
		test: null,
		resultat: null,
	},
	data() {
		return {
			visible: false,
		};
	},
	methods: {
		toggleVisibilite() {
			this.visible = !this.visible;
		},
	},
};
