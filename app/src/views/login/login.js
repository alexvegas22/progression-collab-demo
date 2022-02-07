import Login from "@/components/login/login.vue";
const axios = require("axios");

import {
	callbackAuth,
} from "@/services/index.js";

import { postData } from "@/services/request_services";

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
			return this.$store.state.token;
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
					else if(new URLSearchParams(window.location.search).has('uri')){
						this.$router.push({
							name: 'Question',
							query: this.$route.query,
						})
					}
					else{
						this.$router.push({name: 'Home'})
					}
				}
				catch(err){
					if (err.response && err.response.status == 401) {
						this.$store.dispatch("setErreurs", { message: this.$t("erreur.authentification") });
						this.$store.dispatch("deleteToken");
					}
					else{
						throw err;
					}
				}
				finally{
					this.$store.dispatch("setAuthentificationEnCours", false);
				}
			})()
		},

	}
}
