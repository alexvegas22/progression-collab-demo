<template>
	<div>
		<Login @logué="onLogué" password_req="true" />
		<LTI context="context"/>
	</div>
</template>

<script>
 import Login from "@/components/login/login.vue";
 //import LTI from "@/components/login/liaisonLTI.vue";

 export default {
	 name: "LoginView",
	 components: {
		 Login,
		 //LTI
	 },
	 props: {
		 ref: String,
		 ltik: String,
		 context: String,
	 },
	 methods: {
		 onLogué(token, cléApi){
			 if (token) {
				 if (cléApi){
					 this.envoyerCléApi(token, cléApi)
				 }
				 this.envoyerToken(token)
			 }

			 this.rediriger();
		 },
		 rediriger(){
			 this.$router.push(this.ref);
		 },
		 envoyerToken(){},
		 envoyerCléApi(){},
	 }
 
 };
</script>
