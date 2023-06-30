import constantes from "@/util/constantes.js";
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
			tokenDécodé : null,
			ongletSélectionné: null
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
				try{
					this.tokenDécodé = jwt_decode(token);
					var urlUser = this.tokenDécodé.data.url_user;
				}
				catch( err ){
					console.log("Token invalide");
					return;
				}
				
				(async () => {
					try {
						await this.$store.dispatch("mettreÀJourUser",{
							url: urlUser,
							user: { état : constantes.USER.ACTIF },
							token: { jwt: token }
						});
						this.$store.dispatch("setUsername", this.tokenDécodé.data.user.username);
						this.messageInformation = this.$t("validationCourriel.réussie");
						this.validationRéussie = !this.validationRéussie;
						this.ongletSélectionné = "STANDARD";
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
				const urlUser = this.tokenDécodé.data.url_user;
				const username = this.tokenDécodé.data.user.username;
				const courriel = this.tokenDécodé.data.user.courriel;

				const réponse = await this.$store.dispatch("inscrire", {urlUser : urlUser, identifiant : username, courriel : courriel});
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
			this.ongletSélectionné = "";
			if ( this.authLocal === false && this.authLdap === false ) {
				(async () => {
					await this.$store.dispatch("inscrire", event);
					this.effectuerLogin( event );
				})();
			}
			else if ( this.authLocal ) {
				(async () => {

					try{
						await this.$store.dispatch("inscrire", event);

						this.messageInformation = this.$t("validationCourriel.expédié");
						this.validationRéussie = !this.validationRéussie;
						this.ongletSélectionné = "STANDARD";
					}
					catch(err){
						if ( err?.response?.status >= 400 && err?.response?.status < 500){
							var erreurs = err.response.data.erreur;
							var messageErreur="";
							for(var champ of ["username", "courriel", "password"]){
								if(champ in erreurs){
									if (erreurs[champ][0]?.startsWith( "Err: 1001." )){
										messageErreur += this.$t(`erreur.inscription.${champ}.existant`) + "<br>";
									}
									else if (erreurs[champ][0]?.startsWith( "Err: 1003." )){
										messageErreur += this.$t(`erreur.inscription.${champ}.invalide`) + "<br>";
									}
									else if (erreurs[champ][0]?.startsWith( "Err: 1004." )){
										messageErreur += this.$t(`erreur.inscription.${champ}.vide`) + "<br>";
									}
								}
							}
							this.$store.dispatch("setErreurs", { message: messageErreur});
						}
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
							if (erreurs.username[0]?.startsWith( "Err: 1004." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.champUsernameVide") });
							}
						}
						if ("courriel" in erreurs && erreurs.courriel[0] ){
							if (erreurs.courriel[0]?.startsWith( "Err: 1004." )){
								this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription.champCourrielVide") });
							}
						}
						if ("password" in erreurs && erreurs.password[0] ) {
							if (erreurs.password[0]?.startsWith( "Err: 1004." )){
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
