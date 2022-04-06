<template>
	<metainfo>
		<template #title="{ content }">
			{{ content ? `${content} | Progression` : `Progression` }}
		</template>
	</metainfo>
	<div
		v-shortkey="['ctrl', 'alt', 's']"
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
			<div>
				<div
					v-show="!page_login"
					class="topnav-left"
				>
					<button
						v-if="token"
						type="button"
						class="btn btn-outline-secondary"
						@click="déconnexion"
					>
						{{ $t('menu.déconnexion') }}
					</button>
					<button
						v-else
						type="button"
						class="btn btn-outline-secondary"
						@click="connexion"
					>
						{{ $t('menu.connexion') }}
					</button>
				</div>
				<div
					class="topnav-right"
					présentation_étape="1.0"
				>
					<label>
						<input
							v-model="thèmeSombre"
							type="checkbox"
							style="opacity:0;"
						>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="white"
							class="bi bi-circle-half navBtn"
							viewBox="0 0 16 16"
						>
							<path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
						</svg>
					</label>
				</div>
			</div>
		</nav>
		<div>
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
			<router-view />
		</div>
	</div>
</template>

<script>
import { useMeta } from "vue-meta";

const API_URL = process.env.VUE_APP_API_URL;

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
		erreurs() {
			return this.$store.state.erreurs;
		},
		setThèmeSombreBasculéAvecRaccourci() {
			return this.$store.state.thèmeSombreBasculéAvecRaccourci;
		}
	},
	watch: {
		thèmeSombre() {
			localStorage.setItem("estThèmeSombre", this.thèmeSombre);
			this.$store.dispatch("setThèmeSombre", this.thèmeSombre);
		},
		setThèmeSombreBasculéAvecRaccourci() {
			if(this.$store.state.thèmeSombreBasculéAvecRaccourci === true) {
				this.basculerThèmeSombreAvecRaccourci();
				this.$store.dispatch("setThèmeSombreBasculéAvecRaccourci", false);
			}
		}
	},
	created() {
		this.$store.dispatch("getConfigServeur", API_URL + "/config" );
		this.traiterParamètresURL( window.location.search );
		this.$store.dispatch("setThèmeSombre", this.thèmeSombre);
	},
	methods: {
		traiterParamètresURL( paramètres ){
			var urlParams = new URLSearchParams(paramètres);

			if(urlParams.has("uri")){
				this.$store.dispatch("setUri", urlParams.get("uri"));
			}

			if(urlParams.has("lang")){
				this.$store.dispatch("setLangageDéfaut", urlParams.get("lang"));
			}

			if(urlParams.has("demo")){
				this.$store.dispatch("setDémo", true);
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
			this.$store.dispatch("deleteToken");
			this.$router.push({name: "Home"});
		},
		basculerThèmeSombreAvecRaccourci() {
			this.thèmeSombre = localStorage.getItem("estThèmeSombre") === "false";
		},
	}
};
</script>
<style src="./theme-sombre.css"></style>