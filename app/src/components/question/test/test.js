import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";

export default {
	components: { ResultatTest},
	name: "Test",
	props: {
		test: null,
		réussi: null,
		non_réussi: null,
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
