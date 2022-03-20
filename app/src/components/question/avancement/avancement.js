export default {
	name: "Avancement",
	props: {
		thèmeSombre: Boolean
	},
	inject: ['avancement'],
	computed: {
		langage() {
			return this.$store.state.tentative ? this.$store.state.tentative.langage : null;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives ?? [];
		},
		langages() {
			return Object.keys(this.$store.state.question.ebauches);
		},
	},
	methods: {
		filtrerTentativesParLangage: function (langage) {
			return this.tentatives.filter((item) => item.langage == langage);
		},
		chargerTentative: function () {
			const msgAvertissement = this.$t("editeur.réinitialiser_avertissement");
			if (confirm(msgAvertissement) == true) {
				this.$store.dispatch("getTentative", event.target.value);
			}
		},
		timestampVersDate: function (timestamp) {
			return new Date(timestamp * 1000).toLocaleString("fr-CA");
		},
		étatVersChaîne: function (etat) {
			let etatString;
			switch (etat) {
				case 0:
					etatString = "premièreTentative";
					break;
				case 1:
					etatString = "questionNonRésolue";
					break;
				case 2:
					etatString = "questionRésolue";
					break;
				default:
					etatString = "questionIndéterminée";
			}
			return etatString;
		},
		reinitialiserCodeEditeur(langage) {
			const msgAvertissement = this.$t("editeur.réinitialiser_avertissement");
			if (confirm(msgAvertissement) == true) {
				this.$store.dispatch("réinitialiser", langage);
			}
		},
		redirigerVersLogin(ref) {
			this.$router.push({
				name: "LoginView",
				params: {
					ref: ref,
				},
			});
		},
	},
};
