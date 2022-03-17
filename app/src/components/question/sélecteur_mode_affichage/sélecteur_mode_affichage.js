export default {
	name: "SélecteurModeAffichage",
	computed: {
		mode_affichage: {
			get: function () {
				return this.$store.state.mode_affichage;
			},
			set: function (mode) {
				this.$store.state.mode_affichage = mode;
			},
		},
	},
	mounted() {
		this.$mousetrap.bind('shift+d', this.mode_affichage);
	},	
};
