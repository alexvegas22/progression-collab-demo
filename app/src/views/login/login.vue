<template>
	<div v-if="configServeur">
		<Login @onAuth="onAuth" @onLogin="onLogin" password_req="true" plateforme="LMS" cours="Mon cours" />
	</div>
</template>

<script>
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
			 const persister = event.persister;
			 const token = event.token;
			 const username = event.username;

			 this.$store.dispatch("setUsername", username);

			 this.$store.dispatch("setToken", token);
			 
			 this.$store.dispatch("getUser", process.env.VUE_APP_API_URL + "/user/" + username).then( (user) => {
				 sessionStorage.setItem("token", token);
				 return this.générerAuthKey(user, token, persister ? 0 : (Math.floor(Date.now()/1000 + parseInt(process.env.VUE_APP_API_AUTH_KEY_TTL))))
			 }).then( (authKey) => {
				 const storage = persister ? localStorage : sessionStorage;
				 storage.setItem("username", username);
				 storage.setItem("authKey_nom", authKey.nom);
				 storage.setItem("authKey_secret", authKey.clé.secret);
			 }).then( () => {
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
			 });
		 },

		 onAuth( event ){
			 console.log("Callback auth Non implémenté");
		 },

		 générerAuthKey(user, token, expiration=0) {
			 const clé_id = "LTIauthKey_" + this.randomID();

			 const clé = { nom: clé_id,
						   portée: 1,
						   expiration: expiration,
			 }

			 return postData( user.liens.clés, clé, token )
				 .then( (data) => {
					 return { nom: clé_id,
							  clé: data.data.attributes}
				 });
			 
		 },

		 randomID() {
			 // Math.random should be unique because of its seeding algorithm.
			 // Convert it to base 36 (numbers + letters), and grab the first 9 characters
			 // after the decimal.
			 return Math.random().toString(36).substr(2, 9);
		 }
	 }
 }
</script>
