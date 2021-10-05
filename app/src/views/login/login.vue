<template>
	<div>
		<Login @logué="onLogué" password_req="true" />
	</div>
</template>

<script>
 import Login from "@/components/login/login.vue";

 export default {
	 name: "LoginView",
	 components: {
		 Login,
	 },
	 props: {
		 ref: String,
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
