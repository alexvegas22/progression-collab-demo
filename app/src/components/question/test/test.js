import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";

export default {
	components: { ResultatTest },
	name: "Test",
	props: {
		index: 0,
		test: null,
		réussi: null,
		non_réussi: null,
		sélectionné: false,
	},
	watch:{
		réussi:{
			deep: true,
			handler: function(){
				console.log("Test index "+ this.index +" : réussi :" + this.réussi);
			}
		},
		non_réussi:{
			deep: true,
			handler: function(){
				console.log("Test index "+ this.index +" : non_réussi :" + this.non_réussi);
			}
		},
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