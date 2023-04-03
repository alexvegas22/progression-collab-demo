import Login from "@/components/login/login.vue";

export default {
	name: "LoginView",
	components: {
		Login,
	},
	props: {
		origine: {
			type: String,
			default: null
		}
	},
	computed: {
		token() {
			return this.$store.getters.obtenirToken();
		},
		configServeur() {
			return this.$store.getters.configServeur;
		}
	},
	methods: {
		onLogin( event ){

			(async () => {
				try{
					await this.$store.dispatch("authentifier", event);
					
					// Rediriger vers la page idoine
					if(this.origine){
						this.$router.push(this.origine);
					}
					else if(new URLSearchParams(window.location.search).has("uri")){
						this.$router.push({
							name: "Question",
							query: this.$route.query,
						});
					}
					else{
						this.$router.push({name: "Home"});
					}
				}
				catch( err ){
					if (err.response && err.response.status == 401) {
						this.$store.dispatch("setErreurs", { message: this.$t("erreur.authentification") });
					}
					else if (err.response && err.response.status == 400) {
						var erreurs = err.response.data.erreur;
						if ("username" in erreurs && erreurs.username[0] ){
							if (erreurs.username[0].startsWith( "Err: 1001." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.usernameExistant") });
							}
							else if (erreurs.username[0].startsWith( "Err: 1003." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.usernameInvalide") });
							}
							else if (erreurs.username[0].startsWith( "Err: 1004." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.champUsernameVide") });
							}
						}
						if ("courriel" in erreurs && erreurs.courriel[0] ){
							if (erreurs.courriel[0].startsWith( "Err: 1002." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.courrielExistant") });
							}
							else if (erreurs.courriel[0].startsWith( "Err: 1003." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.courrielInvalide") });
							}
							else if (erreurs.courriel[0].startsWith( "Err: 1004." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.champCourrielVide") });
							}
						}
						if ("password" in erreurs && erreurs.password[0] ) {
							if (erreurs.password[0].startsWith( "Err: 1004." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.champMotDePasseVide") });
							}
						}
					}
					else {
						throw err;
					}
				}
			})();
		},
	},
};
