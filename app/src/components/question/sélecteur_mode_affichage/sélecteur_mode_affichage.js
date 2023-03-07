export default {
	name: "SélecteurModeAffichage",
	computed: {
		mode_affichage: {
			get: function () {
				return this.$store.state.mode_affichage;
			},
			set: function (mode) {
				this.$store.dispatch("setModeAffichage", mode);
			},
		},
		raccourcis() {
			return this.$store.getters.raccourcis;
		}
	},
	methods: {
		changerModeAffichageAvecRaccourci() {
			this.$store.dispatch("basculerModeAffichage");
		},
	}
};
