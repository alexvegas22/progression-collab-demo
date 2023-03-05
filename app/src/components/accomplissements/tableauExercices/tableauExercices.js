export default {
	name: "TableauExercices",
	data() {
		return {
			headers: [
				{text: "Exercice"},
				{text: "Niveau"},
				{text: "Dernière tentative"},
				{text: "Réussite"}
			],
			listeAvancements: [],
			filtreDeRecherche: "",
		};
	},
	computed: {
		avancements() {
			const avancements = this.$store.state.user.avancements;
			for (let avancement in avancements) {
				if(!avancements[avancement].titre){
					avancements[avancement].titre = this.$t("accomplissements.sans_titre");
				}
				this.listeAvancements.push(avancements[avancement]);
			}
			this.listeAvancements.sort(function(a,b){
				return b.date_réussite - a.date_réussite;
			});
			return this.listeAvancements;
		},
		filtreAvancement() {
			
			return this.listeAvancements.filter((avancement) => {
				return avancement.titre.toLowerCase().includes(this.filtreDeRecherche.toLowerCase());
			});
		},
	},
	methods: {
		timestampVersDate: function (timestamp) {
			if (timestamp == 0) {
				return "";
			}
			if (timestamp == null) {
				return "";
			}
			return new Date(timestamp * 1000).toLocaleString();
		},
		allerVersQuestion: function (lien) {
			var avancementDivise = lien.split("/");
			var uri = avancementDivise[avancementDivise.length -1];

			this.$store.dispatch("setTokenRessources", null);
			this.$store.dispatch("setCallbackSucces", null);
			this.$store.dispatch("setCallbackSuccesParams", null);

			this.$store.dispatch("setUri", uri);
			this.$router.push({
				name: "Question",
				query: {
					uri: uri,
				},
			});
		},
	},
};
