export default {
	name: "Avancement",
	computed: {
		avancement() {
			return this.$store.state.avancement;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives;
		},
		nombreTentatives() {
			return (this.$store.state.avancement.tentatives) ? this.$store.state.avancement.tentatives.length : 0;
		},
		ebauches() {
			return this.$store.state.question.ebauches ?? []
		},
	},
	watch: {
		nombreTentatives: function () {
			if (this.nombreTentatives > 0) {
				this.rafraichirSelectionTentative()
			}
		},
	},
	methods: {
		trierTentativesParLangage: function (langage) {
			const liste = []
			this.tentatives.forEach((item) => {
				if(item.langage == langage){
					liste.push(item)
				}
			});
			return liste
		},
		rafraichirSelectionTentative: function () {
			setTimeout(() => {
				var select = document.getElementById("avancement");
				select.children[1].selected = true;
			}, 1000);
		},
		chargerTentative: function (lien) {
			this.$store.dispatch("getTentative", lien);
		},
		convetirDateDepuisTimeStamp: function (timestamp) {
			return new Date(timestamp * 1000).toLocaleString("fr-CA");
		},
		convetirEtatEnString: function (etat) {
			let etatString;
			switch (etat) {
				case 0:
					etatString = "Vous en êtes à votre première tentative !";
					break;
				case 1:
					etatString = "La question n'a pas encore été résolue !";
					break;
				case 2:
					etatString = "La question a déjà été correctement résolue !";
					break;
				default:
					etatString = "La question est indéterminée !";
			}
			return etatString;
		},
	},
};
