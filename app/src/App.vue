<template>
	<metainfo>
		<template #title="{ content }">
			{{ content ? `${content} | Progression` : `Progression` }}
		</template>
	</metainfo>
	<div
		v-shortkey="raccourcis.basculerThème"
		:class="{thème_sombre: thèmeSombre}"
		@shortkey="basculerThèmeSombreAvecRaccourci"
	>
		<nav class="navbar justify-content-between navbar-dark bg-dark">
			<a
				href="/"
				class="navbar-brand text-light mr-auto"
			>
				<span class="text-info"> Prog</span>ression
			</a>
			<span class="text-username">{{username}}</span>
			<Transition>
				<div v-if="token" class="dropdown">
					<i 
						class="fa fa-bars barBtn" 
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					/>
				
					<ul
						class="dropdown-menu"
						aria-labelledby="historique"
					>
						<li
							v-if="token && indicateursDeFonctionnalitéAccomplissements"
							class="btnDMM"
						>
							<i class="fas fa-trophy focus icône-trophée"></i>
							<button
								test_id="btnAvancement"
								type="button"
								class="btn focus"
								@click="allerVers('Accomplissements')"
							>{{ $t('menu.accomplissement') }}</button>
						</li>
						<li
							class="btnDMM"
							@click="basculerThèmeSombreAvecRaccourci"
						>
							<a class="focus padding">
								<i class="fas fa-adjust margin-liens icône-thème"></i>
							
								<label>
									<span v-if="this.thèmeSombre===true">{{$t("menu.thèmeClair")}}</span>
									<span v-else>{{$t("menu.thèmeSombre")}}</span>
									<input 
										v-model="thèmeSombre"
										type="checkbox"
										style="opacity:0;"
										class="input-thème"
										@click="basculerThèmeSombreAvecRaccourci"
									>
								</label>
							</a>
						</li>
						<li class="btnDMM">
							<a>
								<button
									v-if="token"
									class="btn focus"
									@click="déconnexion"
								><span class="fa fa-sign-out icône-déconnexion"></span>{{ $t('menu.déconnexion') }}</button>
							</a>
						</li>
					</ul>
				
				</div>
				<div v-else>
					<button
						class="btn focus btn-connexion"
						@click="connexion"
					><span class="fa fa-sign-out icône-connexion"></span>{{ $t('menu.connexion') }}</button>
				</div>
			</Transition>
		</nav>
		<div class="contenu">
			<div
				v-show="erreurs"
				class="alert alert-danger"
			>
				<button
					type="button"
					class="close"
					data-dismiss="alert"
					aria-hidden="true"
					@click="effacerErreurs()"
				>
					×
				</button>
				<div v-if="erreurs && erreurs.message">
					{{ erreurs.message }}
				</div>
				<div v-if="erreurs && erreurs.détails">
					{{ $t("erreur.réseau") }}
					<details>
						<summary>
							détails
						</summary>
						{{ erreurs.détails }}
					</details>
				</div>
			</div>
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

const API_URL = import.meta.env.VITE_API_URL;

export default {
	name: "App",
	setup () {
		useMeta({
			title: "Progression",
			htmlAttrs: { lang: "fr", amp: true }
		});
	},
	data() {
		return {
			cb_auth: null,
			cb_auth_params: null,
			thèmeSombre: localStorage.getItem("estThèmeSombre") === "true",
		}; },
	computed: {
		page_login(){
			return this.$route.name=="LoginView";
		},
		token() {
			return this.$store.state.token;
		},
		username() {
			return this.$store.state.username;
		},
		erreurs() {
			return this.$store.state.erreurs;
		},
		setThèmeSombreBasculéAvecRaccourci() {
			return this.$store.state.thèmeSombreBasculéAvecRaccourci;
		},
		indicateursDeFonctionnalitéAccomplissements(){
			return this.$store.state.indicateursDeFonctionnalité["accomplissements"];
		},
		raccourcis(){
			return this.$store.state.raccourcis;
		},
		enChargement() {
			return this.$store.state.enChargement;
		}
	},
	watch: {
		thèmeSombre() {
			localStorage.setItem("estThèmeSombre", this.thèmeSombre);
			this.$store.dispatch("setThèmeSombre", this.thèmeSombre);
		},
	},
	 created() {
		const username = sessionStorage.getItem("username") || localStorage.getItem("username");
		if(username){
			this.$store.dispatch("setUsername", username);
		}
		this.$store.dispatch("récupérerConfigServeur", API_URL + "/config" );
		this.traiterParamètresURL( window.location.search );
		this.$store.dispatch("setThèmeSombre", this.thèmeSombre);
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
		effacerErreurs(){
			this.$store.dispatch("setErreurs", null);
		},
		connexion(){
			this.$router.push({name: "LoginView"});
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
			this.allerVers("Home");
		},
		basculerThèmeSombreAvecRaccourci() {
			this.thèmeSombre = localStorage.getItem("estThèmeSombre") === "false";
		},
		allerVers( vue ){
			this.$router.push({
				name: vue,
			});
		}
	}
};
</script>

<style src="./css/mainMenu.css"></style>
<style src="./theme-sombre.css"></style>
