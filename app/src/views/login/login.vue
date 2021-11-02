<template>
	<div>
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
		 ref: String,
	 },
	 computed: {
		 token() {
			 return this.$store.state.token;
		 }
	 },
	 watch: {
		 token(){
			 this.$router.push( {
				 name: 'Question',
				 params: {
					 ...this.ref,
				 } } );
		 }
	 },
	 methods: {
		 onLogin( event ){
			 const persister = event.persister;
			 const token = event.token;
			 const username = event.username;

			 this.$store.dispatch("setUsername", username);

			 this.$store.dispatch("setToken", token).then( () =>
				 this.$store.dispatch("getUser", process.env.VUE_APP_API_URL + "/user/" + username)
			 ).then((user) => {
				 sessionStorage.setItem("token", token);
				 return this.générerAuthKey(persister ? 0 : (Math.floor(Date.now()/1000 + parseInt(process.env.VUE_APP_API_AUTH_KEY_TTL))))
			 }).then( (authKey) => {
				 const storage = persister ? localStorage : sessionStorage;
				 storage.setItem("username", username);
				 storage.setItem("authKey_nom", authKey.nom);
				 storage.setItem("authKey_secret", authKey.clé.secret);
			 })
		 },

		 onAuth( event ){
			 console.log("Callback auth Non implémenté");
		 },

		 générerAuthKey(expiration=0) {
			 const clé_id = "LTIauthKey_" + this.randomID();

			 const clé = { nom: clé_id,
						   portée: 1,
						   expiration: expiration,
			 }

			 return postData( this.$store.state.user.liens.clés, clé , this.$store.state.token )
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
