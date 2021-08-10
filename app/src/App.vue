<template>
	<div id="app"></div>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<router-link :to="{ name: 'Home' }" class="navbar-brand text-light">
			<span class="text-info"> Prog</span>ression
		</router-link>
	</nav>
	<router-view />
</template>

<script>

 const API_URL = process.env.VUE_APP_API_URL;
 
 export default {
	 name: "App",
	 computed: {
		 username() {
			 return this.$store.state.username;
		 },
		 token() {
			 return this.$store.state.token;
		 }
	 },
	 mounted() {
		 var token;

		 const query_parts = window.location.href.split('#');
		 var urlParams = new URLSearchParams(query_parts[0]);
			 
		 if(urlParams.has('token')){
			 token = urlParams.get('token');
			 localStorage.setItem("user-token", token);
			 this.$store.dispatch("setToken", token);
		 }
		 else{
			 token = localStorage.getItem("user-token");

			 if(token && !this.$store.state.token){
				 this.$store.dispatch("setToken", token);
			 }
		 }

		 if(token){
			 this.$store.dispatch("getUser", API_URL + "/user/" + this.$store.state.username)
		 }
		 else{
			 this.$router.push( {name: 'LoginView', params: { ref: window.btoa(window.location.href), ltik: urlParams.get('ltik'), context: urlParams.get('context') } } );
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
