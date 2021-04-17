import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";

export default {
	components: { ResultatTest },
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
