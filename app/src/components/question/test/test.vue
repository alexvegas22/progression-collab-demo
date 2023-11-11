<template>
	<div
		@click="toggleVisibilite"
	>
		<div
			class="test"
			:class="{
				sélectionné,
				non_sélectionné: !sélectionné,
				réussi,
				non_réussi
			}"
		>
			<div style="display: flex; flex-flow: row; align-items: center">
				<span style="min-width:1rem" :class="{symbole_réussi: réussi, symbole_non_réussi: non_réussi}"></span>
				<div style="flex-grow: 1">{{ (index+1) + '. ' + test.nom }}</div>
				<slot name="lancement"/>
			</div>
		</div>
	</div>
</template>

<script src="./test.js"></script>
<style scoped src="./test.css"></style>
