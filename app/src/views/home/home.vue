<template>
	<div class="home">
		<Login />
	</div>
</template>

<script>
import Login from "@/components/home/login/login.vue";

export default {
	name: "Home",
	components: {
		Login,
	},
};
</script>
