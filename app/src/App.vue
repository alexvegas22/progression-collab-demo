<template>
	<div id="app">
		<div v-show="erreurs" class="alert alert-danger">
			{{$t("erreur.réseau")}}
		<details>
			<summary>
				détails
			</summary>
			{{ erreurs }}
		</details>
		</div>
	</div>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<router-link :to="{ name: 'Home' }" class="navbar-brand text-light">
			<span class="text-info"> Prog</span>ression
		</router-link>
	</nav>
	<router-view />
</template>

<script>
 import tokenEstValide from "@/util/token";
 
 const API_URL = process.env.VUE_APP_API_URL;
 
 export default {
	 name: "App",
	 computed: {
		 erreurs() {
			 return this.$store.state.erreurs;
		 },
		 username() {
			 return this.$store.state.username;
		 }
	 },
	 mounted() {
		 this.traiterParamètresURL( window.location.search );
	 },
	 watch: {
		 username() {
			 if (!this.username) return;
			 
			 if( this.$store.state.token && tokenEstValide( this.$store.state.token ) ){
				 this.chargerUser().catch(
					 (erreur) => {
						 this.redirigerVersLogin( window.btoa(window.location.href) );
					 } );
			 }
			 else{
				 this.redirigerVersLogin( window.btoa(window.location.href) );
			 }
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

			 if(urlParams.has('cb_succes')){
				 this.$store.dispatch("setCallbackSucces", urlParams.get('cb_succes'));
				 if(urlParams.has('cb_succes_params')){
					 this.$store.dispatch("setCallbackSuccesParams", JSON.parse(urlParams.get('cb_succes_params')));
				 }
			 }

			 if(urlParams.has('token')){
				 this.$store.dispatch("setToken", urlParams.get('token'));
			 }
			 else {
				 const token = localStorage.getItem("user-token");
				 if (token) {
					 this.$store.dispatch("setToken", token);
				 }
				 else {
					 this.$store.dispatch("setUsername", "anonyme");
				 }
			 }
		 },
		 chargerUser(){
			 return this.$store.dispatch("getUser", API_URL + "/user/" + this.$store.state.username);
		 },
		 redirigerVersLogin( ref ){
			 this.$router.push( {
				 name: 'LoginView',
				 params: {
					 ref: ref,
				 } } );
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
