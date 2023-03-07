<template>
	<div
		style="flex: 1 1 0; min-height: 0; flex-flow: column"
		:class="{ thème_sombre: thèmeSombre }"
		class="bordure-fenetre d-flex"
	>
		<header v-if="$slots.titre"
			class="bordure-titre p-1"
			:class="{ thème_sombre: thèmeSombre }"
		>
			<slot name="titre" />
		</header>
		<perfect-scrollbar>
			<slot />
		</perfect-scrollbar>
	</div>
</template>

<script src="./fenetre_info.js"></script>

<style scoped src="./fenetre_info.css"></style>
