<template>
	<div>
		Bonjour {{ this.$store.state.username }}
	</div>
</template>

<script>
 export default {
	 name: "Home",
	 mounted() {
		 if(this.$store.state.token)
			 this.$router.push({name: "Question"});
		 else
			 this.$router.push({name: "LoginView"});
	 }
 };
</script>
