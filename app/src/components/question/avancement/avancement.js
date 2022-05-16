export default {
	name: "Avancement",
	props: {
		thèmeSombre: Boolean,
		pleinÉcran: Boolean,
		tentativeRéinitialisée: Boolean,
	},
	emits: ["basculéPanneauÉditeur"],
	inject: ["avancement"],
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
		réinitialiserTentativeAvecRaccourci() {
			return this.$store.state.réinitialiserTentativeAvecRaccourci;
		}
	},
	watch:{
		réinitialiserTentativeAvecRaccourci() {
			if(this.réinitialiserTentativeAvecRaccourci === true){
				this.reinitialiserCodeEditeurRaccourcis(this.langage);
				this.$store.dispatch("setRéinitialiserTentativeAvecRaccourci",false);
			}
		},
		tentativeRéinitialisée: {
			deep: true,
			handler: function(){
				this.reinitialiserCodeEditeur(this.$store.state.tentative.langage);
			}
		},
	},
	methods: {
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
		reinitialiserCodeEditeurRaccourcis(){
			this.reinitialiserCodeEditeur(this.$store.state.tentative.langage);
		},
	},
};
