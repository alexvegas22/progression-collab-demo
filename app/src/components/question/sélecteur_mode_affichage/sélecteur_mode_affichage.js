export default {
	name: "SélecteurModeAffichage",
	emits: {
		onModeChange: false,
	},
	props: {
		occupé: Boolean
	},
	computed: {
		mode_affichage: {
			get: function () {
				return this.$store.state.mode_affichage;
			},
			set: function (mode) {
				this.$store.dispatch("setModeAffichage", mode);
				this.$emit("onModeChange", this.mode_affichage == 1 );
			},
		},
		raccourcis() {
			return this.$store.getters.raccourcis;
		}
	},
	methods: {
		changerModeAffichageAvecRaccourci() {
			this.$emit("onModeChange", this.mode_affichage == 1 );
			this.$store.dispatch("basculerModeAffichage");
		},
	}
};
