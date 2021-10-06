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
	 }
 };
</script>
