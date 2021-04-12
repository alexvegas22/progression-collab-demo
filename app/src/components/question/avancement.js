export default {
	name: "Avancement",
	data() {
		return {
			derniereTentative: null,
			tentativesSaufDerniere: [],
		};
	},
	computed: {
		avancement() {
			return this.$store.state.avancement;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives;
		},
	},
	watch: {
		tentatives: function () {
			if (this.tentatives.length > 0) {
				this.tentatives.forEach((elem) => {
					this.tentativesSaufDerniere.push(elem);
				});
				this.derniereTentative = this.tentativesSaufDerniere.pop();
				console.log("J'écoute !")
			}
		},
	},
	methods: {
		chargerTentative: function (lien) {
			this.$store.dispatch("getTentative", lien);
		},
		convetirDateDepuisTimeStamp: function (timestamp) {
			let date = new Date(timestamp * 1000);
			return date.toLocaleString("fr-CA");
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
