export default {
	name: "Avancement",
	computed: {
		avancement() {
			return this.$store.state.avancement;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives;
		},
		derniereTentative() {
			return this.$store.state.avancement.tentatives[0];
			//return this.$store.state.tentative;
		},
	},
	methods: {
		chargerTentativesSaufPlusRecnte: function(){
			const tab = []
			if(this.tentatives.length > 1){
				this.tentatives.forEach((elem) => {
					tab.push(elem);
				});
				tab.shift();
			}
			return tab
		},
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
		}
	}
};
