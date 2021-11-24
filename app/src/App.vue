<template>
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
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<a href="/home/index.html" class="navbar-brand text-light">
			<span class="text-info"> Prog</span>ression
		</a>
	</nav>
	<router-view />
</template>

<script>
 import tokenEstValide from "@/util/token";
 
 const API_URL = process.env.VUE_APP_API_URL;
 
 export default {
	 name: "App",
	 data() {
		 return {
			 cb_auth: null,
			 cb_auth_params: null,
		 } },
	 computed: {
		 token() {
			 return this.$store.state.token;
		 },
		 erreurs() {
			 return this.$store.state.erreurs;
		 },
		 username() {
			 return this.$store.state.username;
		 }
	 },
	 mounted() {
		 this.traiterParamètresURL( window.location.search );

		 if(this.récupérerUserInfos()){
			 this.chargerUser();
		 }
		 else{
			 this.redirigerVersLogin( window.btoa(window.location.href) );
		 }
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
		 récupérerUserInfos(){
			 const token = sessionStorage.getItem("token") || localStorage.getItem("token");
			 const username = sessionStorage.getItem("username") || localStorage.getItem("username");
			 this.$store.dispatch("setToken", token);
			 this.$store.dispatch("setUsername", username);

			 return username;
		 },
		 chargerUser(){
			 return this.$store.dispatch("getUser", process.env.VUE_APP_API_URL + "/user/" + this.$store.state.username).catch((err) => {
				this.redirigerVersLogin( window.btoa(window.location.href) );
			 });
		 },
		 redirigerVersLogin( ref ){
			 this.$router.push( {
				 name: 'LoginView',
				 params: {
					 ref: ref,
				 } } );
		 },
		 effacerErreurs(){
			 this.$store.dispatch("setErreurs", null);
		 }
	 }
 };
</script>

<style src="./css/style.css">
 #app {
	 font-family: Avenir, Helvetica, Arial, sans-serif;
	 -webkit-font-smoothing: antialiased;
	 -moz-osx-font-smoothing: grayscale;
	 text-align: center;
	 color: #2c3e50;
 }

 #nav {
	 padding: 30px;
 }

 #nav a {
	 font-weight: bold;
	 color: #2c3e50;
 }

 #nav a.router-link-exact-active {
	 color: #42b983;
 }
</style>
