import BoîteConfirmation from "@/components/boîtes_de_dialogue/boîte_confirmation.vue";

export default {
	name: "TTYShare",
	components: {
		BoîteConfirmation,
	},
	props: {
		url: String,
	},
	data() {
		return {
			confirmerRéinitialisation: true,
		};
	},
	computed: {
		enChargement(){
			return this.$store.getters.conteneurEnChargement;
		},
	},
	methods: {
		réinitialiser() {
			this.confirmerRéinitialisation = !this.confirmerRéinitialisation;
		},
		extraire_terminal(){
			window.open(this.url, "_blank");
		},
		onConfirmerRéinitialisation( réponse ){
			if(réponse == "oui"){
				this.$store.dispatch("réinitialiserConteneur");
			}
		}
	}
};
