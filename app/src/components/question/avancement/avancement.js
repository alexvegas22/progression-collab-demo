export default {
	name: "Avancement",
	props: {
		thèmeSombre: Boolean,
		pleinÉcran: Boolean,
	},
	emits: ["basculéPanneauÉditeur"],
	inject: ["avancement"],
	computed: {
		langage() {
			return this.$store.state.tentative?.langage;
		},
		langage_capitalisé() {
			return this.capitalize( this.langage );
		},
		tentatives() {
			return this.$store.state.avancement.tentatives ?? [];
		},
		langages() {
			return Object.keys(this.$store.state.question.ebauches);
		},
		raccourcis() {
			return this.$store.state.raccourcis;
		},
	},
	methods: {
		capitalize: function( chaîne ) {
			return chaîne.charAt(0).toUpperCase() + chaîne.slice(1);
		},
		filtrerTentativesParLangage: function (langage) {
			return this.tentatives.filter((item) => item.langage == langage);
		},
		chargerTentative: function () {
			const msgAvertissement = this.$t("editeur.réinitialiser_avertissement");
			if (confirm(msgAvertissement) == true) {
				this.$store.dispatch("récupérerTentative", {
					urlTentative: event.target.value,
					tkres: this.$store.state.tokenRessources,
				});
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
