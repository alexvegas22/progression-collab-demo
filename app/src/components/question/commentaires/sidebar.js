export default {
	emits: ["basculerMenuCommentaire"],
	computed: {
		commentaires(){
			return this.$store.state.tentative.commentaires ?? [];
		},
		user() {
			return this.$store.state.user;
		},
	},
	props:{
		menuCommentaireOuvert: Boolean
	},
	data(){
		return{
			commentaire:"",
			commentaire_vide:false,
			numeroLigne:"",
			numeroLigneVide:false,
			numeroNonEntier:false
		};
	},
	methods: {
		fermerMenuCommentaire(){
			this.$emit("basculerMenuCommentaire");
		}, 
		verificationSoumissionCommentaire(){
			this.commentaire = this.commentaire.trim();
			this.commentaire_vide = this.commentaire == "";
			this.numeroLigneVide = this.numeroLigne == "";
			this.numeroNonEntier = isNaN(this.numeroLigne);
			if (this.commentaire_vide || this.numeroLigneVide || this.numeroNonEntier) {
				return;
			}
			else {
				this.soumettreCommentaire();
			}
		},
		async soumettreCommentaire (){
			await this.$store
				.dispatch("créerCommentaire", {
					url: this.$store.state.tentative.liens.commentaires,
					message: this.commentaire,
					créateur: this.user.username,
					numéro_ligne: this.numeroLigne,
					tkres: this.$store.state.tokenRessources,
				}
				);
			var commentaire = { créateur:this.user.username, message:this.commentaire , numéro_ligne:this.numeroLigne};
			this.commentaires.unshift(commentaire);
		},
	},
};
