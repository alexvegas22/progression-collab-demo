import USER from "@/util/constantes.js";
import Login from "@/components/login/login.vue";
import BoîteInfo from "@/components/boîtes_de_dialogue/boîte_info.vue";
import BoîteConfirmation from "@/components/boîtes_de_dialogue/boîte_confirmation.vue";
import jwt_decode from "jwt-decode";

export default {
	name: "LoginView",
	data(){
		return {
			validationRéussie : true,
			messageInformation : "",
			erreurDeValidation : true,
			tokenDécodé : null
		};
	},
	components: {
		BoîteConfirmation,
		Login,
		BoîteInfo,
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
		},
		authLocal(){
			return this.configServeur.AUTH.LOCAL;
		},
		authLdap(){
			return this.configServeur.AUTH.LDAP;
		}
	},
	mounted() {
		this.traiterValidationDeCourriel( window.location.search );
	},
	methods: {
		traiterValidationDeCourriel(paramètres){
			var urlParams = new URLSearchParams(paramètres);
			if( urlParams.has("token") ) {
				const token = urlParams.get("token");
				this.tokenDécodé = jwt_decode(token);
				var urlUser = this.tokenDécodé.ressources.data.url_user;
				
				(async () => {
					try {
						await this.$store.dispatch("mettreÀJourUser",{
							url: urlUser,
							user: { état : USER.ÉTAT_ACTIF },
							token: token
						});

						this.messageInformation = this.$t("validationCourriel.réussie");
						this.validationRéussie = !this.validationRéussie;
					}
					catch ( err ) {
						if ( err?.response?.status == 401 ) {
							this.erreurDeValidation = !this.erreurDeValidation;
						}
						else {
							throw err;
						}
					}
				})();
			}
		},
		
		async onRéponse( event ){
			if ( event == "oui" ) {
				const urlUser = this.tokenDécodé.ressources.data.url_user;
				const username = this.tokenDécodé.user.username;
				const courriel = this.tokenDécodé.user.courriel;

				const réponse = await this.$store.dispatch("inscrire", {urlUser : urlUser, username : username, courriel : courriel});
				if ( réponse ) {
					this.messageInformation = this.$t("validationCourriel.expédié");
					this.validationRéussie = !this.validationRéussie;
				}
			}
		},

		onLogin( event ){
			this.effectuerLogin( event );
		},
		
		onInscrire ( event ) {
			if ( this.authLocal === false && this.authLdap === false ) {
			    this.effectuerLogin( event );
			}
			else if ( this.authLocal ) {
				(async () => {
					const réponse = await this.$store.dispatch("inscrire", event);
					if ( réponse ){
						this.messageInformation = this.$t("validationCourriel.expédié");
						this.validationRéussie = !this.validationRéussie;
					}
				})();
			}
		},
		
		effectuerLogin( params ){
			(async () => {
				try{
					await this.$store.dispatch("authentifier", params);
					
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
