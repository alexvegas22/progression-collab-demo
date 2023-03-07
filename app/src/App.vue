<template>
	<metainfo>
		<template #title="{ content }">
			{{ content ? `${content} | Progression` : `Progression` }}
		</template>
	</metainfo>
	<v-app :theme="thèmeSombre?'dark':'light'" :class="{thème_sombre: thèmeSombre}">
		<v-main>
			<v-app-bar
				border="1"
				flat>
				<v-app-bar-title>
					<div>
						<div
							onclick="window.location='./'"
							style="cursor:pointer; width: fit-content"
							class="font-family-serif"
						>
							<span style="color:rgb(13,202,240); font-weight: bold">Prog</span>ression
						</div>
					</div>
				</v-app-bar-title>
				<div  v-if="$store.getters.obtenirToken()">

					<v-row>
						<v-col>
							<v-card
								width="max-content"
								flat
								:text = "username" />
						</v-col>
						<v-col>

							<v-app-bar-nav-icon @click.stop="drawer = !drawer">
								<div class="d-xxl-none"> <v-icon icon="mdi-dots-vertical"/></div>
								<div class="d-none d-xxl-flex"  > <v-icon :icon="drawer ? 'mdi-chevron-double-left' : 'mdi-chevron-double-right'"/></div>
							</v-app-bar-nav-icon>

						</v-col>
					</v-row>
				</div>

				<div v-else>
					<v-btn
						@click="connexion"
					><v-icon icon="mdi-login" />{{ $t('menu.connexion') }}</v-btn>
				</div>

			</v-app-bar>

			<BannièreErreur style="width: 75vw" />
			<NavBar :drawer="drawer" v-if="$store?.getters.obtenirToken()"
				@accomplissements="allerVersAccomplissements"
				@nouvelExercice="nouvelExercice"
				@basculerThèmeSombre="basculerThèmeSombre"
				@basculerLocale="basculerLocale"
				@basculerVersion="basculerVersion"
				@déconnexion="déconnexion" />

			<div v-show="enChargement" class="loader-parent">
				<div class="loader">
				</div>
			</div>

			<DialogURL :ouvrir="dialogNouvelExercice" @ok="(url) => ouvrirNouvelExercice(url)" />

			<router-view v-show="!enChargement" />

		</v-main>
	</v-app>
</template>

<script>
import { useMeta } from "vue-meta";
import BannièreErreur from "@/components/bannière/bannière_erreur.vue";
import NavBar from "@/components/navbar/navbar.vue";
import DialogURL from "@/components/dialogurl/dialogurl.vue";
 
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
		DialogURL,
	},
	data() {
		return {
			cb_auth: null,
			cb_auth_params: null,
			drawer: true,
			dialogNouvelExercice: false,
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
		username() {
			return this.$store.state.username;
		},
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
			this.allerVers("LoginView");
		},
		allerVersAccomplissements(){
			this.allerVers("Accomplissements");
		},
		nouvelExercice() {
			this.dialogNouvelExercice=!this.dialogNouvelExercice;
		},
		déconnexion(){
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
		basculerThèmeSombre() {
			this.$store.dispatch("basculerThèmeSombre");
		},
		basculerVersion() {
			const version = this.$cookies.get("fe_version");
			this.$cookies.set("fe_version", version != "dev" ? "dev" : "prod");
			window.location.reload();
		},
		basculerLocale() {
			this.$store.dispatch("basculerLocale");
		},
		allerVers( vue, query=null ){
			this.$router.push({
				name: vue,
				query: query
			});
		},
		ouvrirNouvelExercice(url) {
			if(url) {
				this.$store.dispatch("setUri", url);
				this.allerVers("Question", {uri: url});
			}
		}
	}
};
</script>
<style src="./css/mainMenu.css"></style>
<style src="./css/theme-sombre.css"></style>
