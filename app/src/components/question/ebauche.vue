<template>
	<div class="question">
		<p>Voici les ébauches disponibles :</p>
		<div class="ebauche" v-bind:key="ebauche" v-for="ebauche in ebauches">
			<p>{{ ebauche }}</p>
		</div>
	</div>
</template>

<script src="./ebauche.js"></script>

<style src="./ebauche.css"></style>
