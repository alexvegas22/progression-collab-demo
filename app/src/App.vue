<template>
	<metainfo>
		<template v-slot:title="{ content }">{{ content ? `${content} | Progression` : `Progression` }}</template>
	</metainfo>
	<div id="app">
		<div v-show="erreurs" class="alert alert-danger">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true" @click="effacerErreurs()">
				×
			</button>
			<div v-if="erreurs && erreurs.message">
				{{erreurs.message}}
			</div>
			<div v-if="erreurs && erreurs.détails">
        		{{$t("erreur.réseau")}}
				<details >
					<summary>
						détails
					</summary>
					{{ erreurs.détails }}
				</details>
			</div>
		</div>
	</div>
	<nav class="navbar justify-content-between navbar-dark bg-dark">

		<a href="/" class="navbar-brand text-light mr-auto">
			<span class="text-info"> Prog</span>ression
		</a>

		<div class="dropdown">
		<button class="modBarbtn" type="button" id="menu_historique" data-bs-toggle="dropdown" aria-expanded="false">
			<div class="barBtn"></div>
			<div class="barBtn"></div>
			<div class="barBtn"></div>
		</button>
		<ul class="dropdown-menu" aria-labelledby="menu_historique">
			<li class="btnDMM">
				<a href="/accomplissements">
					<button type="button" class="btn btnDMMB" style="color:white;">Accomplissements</button>
				</a>
			</li>
			<li class="btnDMM">
				<button v-if="token" type="button" class="btn btnDMMB" style="color:white;" @click="déconnexion">{{ $t('menu.déconnexion') }}</button>
				<button v-else type="button" class="btn btnDMMB" style="color:white;" @click="connexion">{{ $t('menu.connexion') }}</button>
			</li>
		</ul>
		</div>
	</nav>
	<router-view />
</template>

<script>
 import tokenEstValide from "@/util/token";
 import { useMeta } from 'vue-meta'
 
 const API_URL = process.env.VUE_APP_API_URL;
 
 export default {
	 name: "App",
	 setup () {
		 useMeta({
			 title: 'Progression',
			 htmlAttrs: { lang: 'fr', amp: true }
		 })
	 },
	 created() {
		 this.$store.dispatch("getConfigServeur", API_URL + "/config" );
		 this.traiterParamètresURL( window.location.search );
	 },
	 data() {
		 return {
			 cb_auth: null,
			 cb_auth_params: null,
		 } },
	 computed: {
		 page_login(){
			 return this.$route.name=='LoginView';
		 },
		 token() {
			 return this.$store.state.token;
		 },
		 erreurs() {
			 return this.$store.state.erreurs;
		 },
	 },

	
	 methods: {
		 traiterParamètresURL( paramètres ){
			 var urlParams = new URLSearchParams(paramètres);

			 if(urlParams.has('uri')){
				 this.$store.dispatch("setUri", urlParams.get('uri'));
			 }
			 
			 if(urlParams.has('lang')){
				 this.$store.dispatch("setLangageDéfaut", urlParams.get('lang'));
			 }

			 if(urlParams.has('demo')){
				 this.$store.dispatch("setDémo", true);
			 }

			 if(urlParams.has('cb_succes')){
				 this.$store.dispatch("setCallbackSucces", urlParams.get('cb_succes'));
				 if(urlParams.has('cb_succes_params')){
					 this.$store.dispatch("setCallbackSuccesParams", JSON.parse(urlParams.get('cb_succes_params')));
				 }
			 }

			 if(urlParams.has('cb_auth')){
				 this.$store.dispatch("setCallbackAuth", urlParams.get('cb_auth'));
				 if(urlParams.has('cb_auth_params')){
					 this.$store.dispatch("setCallbackAuthParams", JSON.parse(urlParams.get('cb_auth_params')));
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
		 }
	 }
 };
</script>

<style src="./css/mainMenu.css"></style>
