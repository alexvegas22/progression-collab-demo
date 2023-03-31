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
						var msgErr = err.response.data.erreur;
						if ("username" in msgErr && msgErr.username[0] ){
							if (msgErr.username[0].startsWith( "Err: 1001." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.usernameExistant") });
							}
						}
						if ("courriel" in msgErr && msgErr.courriel[0] ){
							if (msgErr.username[0].startsWith( "Err: 1002." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.courrielExistant") });
							}
						}
						if ("courriel" in msgErr && msgErr.courriel[0] ) {
							if (msgErr.courriel[0].startsWith( "Err: 1003." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.courrielInvalide") });
							}
						}
						if ( ("username" in msgErr && msgErr.username[0] ) ||
							 ("courriel" in msgErr && msgErr.courriel[0] ) ||
							 ("password" in msgErr && msgErr.password[0] ) ||
							 ("confirmation" in msgErr && msgErr.confirmation[0] ))
						{
							if (msgErr.username[0].startsWith( "Err: 1004." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.champUsernameVide") });
							}
							if (msgErr.courriel[0].startsWith( "Err: 1004." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.champCourrielVide") });
							}
							if (msgErr.password[0].startsWith( "Err: 1004." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.champMotDePasseVide") });
							}
							if (msgErr.confirmation[0].startsWith( "Err: 1004." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.champConfirmationVide") });
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
