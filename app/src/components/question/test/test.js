import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";

export default {
	components: { ResultatTest },
	name: "Test",
	props: {
		index: 0,
		test: null,
		réussi: null,
		sélectionné: false,
	},
	data() {
		return {
			visible: false,
		};
	},
	methods: {
		toggleVisibilite() {
			this.$emit("select");
		},
	},
};
