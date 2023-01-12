<template>
	<metainfo>
		<template #title="{ content }">
			{{ content ? `${content} | Progression` : `Progression` }}
		</template>
	</metainfo>
	<div
		:class="{thème_sombre: thèmeSombre}"
	>
		<NavBar @connexion="connexion" @déconnexion="déconnexion" />
		<div class="contenu">
			<BannièreErreur/>
			<div v-if="enChargement" class=loader-parent>
				<div class="loader">
				</div>
			</div>
			<router-view />
		</div>
	</div>
</template>

<script>
import { useMeta } from "vue-meta";
import BannièreErreur from "@/components/bannière/bannière_erreur.vue";
import NavBar from "@/components/navbar/navbar.vue";
 
const API_URL = import.meta.env.VITE_API_URL;

export default {
	name: "App",
	setup () {
		useMeta({
			title: "Progression",
			htmlAttrs: { lang: "fr", amp: true }
		});
	},
	components: {
		BannièreErreur,
		NavBar,
	},
	data() {
		return {
			cb_auth: null,
			cb_auth_params: null,
		};
	},
	created() {
		const username = sessionStorage.getItem("username") || localStorage.getItem("username");
		if(username){
			this.$store.dispatch("setUsername", username);
		}
		this.$store.dispatch("récupérerConfigServeur", API_URL + "/config" );
		this.traiterParamètresURL( window.location.search );
	},
	computed: {
		enChargement() {
			return this.$store.state.enChargement;
		},
		thèmeSombre() {
			return this.$store.getters.thèmeSombre;
		},
	},
	methods: {
		traiterParamètresURL( paramètres ){
			var urlParams = new URLSearchParams(paramètres);
			if(urlParams.has("tkres")){
				this.$store.dispatch("setTokenRessources", urlParams.get("tkres"));
			}

			if(urlParams.has("cb_succes")){
				this.$store.dispatch("setCallbackSucces", urlParams.get("cb_succes"));
				if(urlParams.has("cb_succes_params")){
					this.$store.dispatch("setCallbackSuccesParams", JSON.parse(urlParams.get("cb_succes_params")));
				}
			}

			if(urlParams.has("cb_auth")){
				this.$store.dispatch("setCallbackAuth", urlParams.get("cb_auth"));
				if(urlParams.has("cb_auth_params")){
					this.$store.dispatch("setCallbackAuthParams", JSON.parse(urlParams.get("cb_auth_params")));
				}
			}
		},
		connexion(){
			console.log("connexion");
			this.$router.push({name: "LoginView"});
		},
		déconnexion(){
			console.log("déconnexion");
			sessionStorage.removeItem("authKey_nom");
			sessionStorage.removeItem("authKey_secret");
			localStorage.removeItem("authKey_nom");
			localStorage.removeItem("authKey_secret");
			sessionStorage.removeItem("token");
			localStorage.removeItem("username");
			sessionStorage.removeItem("username");
			
			this.$store.dispatch("setUsername", null);
			this.$store.dispatch("setUser", null);
			this.$store.dispatch("setToken", null);
			this.$router.push( {name: "Home"} );
		},
	}
};
</script>

<style src="./css/mainMenu.css"></style>
<style src="./css/theme-sombre.css"></style>
