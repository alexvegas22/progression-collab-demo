<template>
	<header v-if="$slots.titre"
		class="bordure-titre p-1"
		:class="{ thème_sombre: thèmeSombre }"
	>
		<slot name="titre" />
	</header>
	<perfect-scrollbar style="height: 100%">
		<slot />
	</perfect-scrollbar>
</template>

<script src="./fenetre_info.js"></script>

<style scoped src="./fenetre_info.css"></style>
