import USER from '@/util/constantes.js';
import Login from "@/components/login/login.vue";
import BoîteConfirmation from "@/components/boite_de_dialogue/boîte_confirmation.vue";
import jwt_decode from "jwt-decode";

export default {
	name: "LoginView",
	data(){
		return {
			courrielValidé : true,
		};
	},
	components: {
		BoîteConfirmation,
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
	mounted() {
		this.traiterValidationDeCourriel( window.location.search );
	},
	methods: {
		traiterValidationDeCourriel(paramètres){
			var urlParams = new URLSearchParams(paramètres);

			if( urlParams.has("token") ) {
				const token = urlParams.get("token");
				const tokenDécodé = jwt_decode(token);
				var urlUser = tokenDécodé.ressources.data.url_user;

				(async () => {
					try {
						await this.$store.dispatch("mettreÀJourUser",{
							url: urlUser,
							user: { état : USER.ÉTAT_ACTIF },
							token: token
						});
					}
					catch ( err ) {
						if ( err?.response?.status == 401 ) {
							this.courrielValidé = false;
						}
						else {
							throw err;
						}
					}
				})();
			}
		},
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
