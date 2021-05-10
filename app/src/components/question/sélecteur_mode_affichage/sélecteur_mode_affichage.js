const diff = require("diff");

export default {
	name: "SélecteurModeAffichage",
	computed: {
		
		mode_affichage() {
			return this.$t("resultat_modes." + this.$store.state.mode_affichage);
		}
	},
	methods: {
		changer_mode() {
			this.$store.state.mode_affichage=(this.$store.state.mode_affichage+1)%3;
		}
	}
};
