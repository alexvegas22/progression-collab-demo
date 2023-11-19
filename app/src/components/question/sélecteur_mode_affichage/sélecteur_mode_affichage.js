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
			set: async function (mode) {
				await this.$store.dispatch("setModeAffichage", mode);
				this.$emit("onModeChange", this.mode_affichage == 1 );
			},
		},
		raccourcis() {
			return this.$store.getters.raccourcis;
		}
	},
	methods: {
		async changerModeAffichageAvecRaccourci() {
			await this.$store.dispatch("basculerModeAffichage");
			this.$emit("onModeChange", this.mode_affichage == 1 );
		},
	}
};
