<template>
	<metainfo>
		<template #title="{ content }">
			{{ content ? `${content} | Progression` : `Progression` }}
		</template>
	</metainfo>
	<v-app :theme="thèmeSombre?'dark':'light'" :class="{thème_sombre: thèmeSombre}">
		<v-card>
			<v-layout>
				<v-main>
					<NavBar v-if="$store?.state?.token" @déconnexion="déconnexion" />
					<v-app-bar>
						<v-app-bar-title>
							<span style="color:rgb(13,202,240)">Prog</span>ression
						</v-app-bar-title>
						<div v-if="!$store?.state?.token">
							<button
								class="btn focus btn-connexion"
								@click="connexion"
							><span class="fa fa-sign-out icône-connexion"></span>{{ $t('menu.connexion') }}</button>
						</div>

					</v-app-bar>
					<v-container style="max-width: 100%" class="p-0 m-0">
						<BannièreErreur/>
						<div v-if="enChargement" class=loader-parent>
							<div class="loader">
							</div>
						</div>
						<router-view />
					</v-container>
				</v-main>
			</v-layout>
		</v-card>
	</v-app>
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
