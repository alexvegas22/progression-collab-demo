import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";

export default {
	components: { ResultatTest },
	name: "Test",
	props: {
		index: 0,
		test: null,
		résultat: null,
		sélectionné: false,
	},
	data() {
		return {
			visible: false,
		};
	},
	computed: {
		réussi: function() {
			return !this.test.dirty!==true && this.résultat===true;
		},
		non_réussi: function(){
			return this.test.dirty!==true && this.résultat===false;
		}
	},
	methods: {
		toggleVisibilite() {
			this.$emit("select");
		},
	},
};
