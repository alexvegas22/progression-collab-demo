<template>
	<div v-if="configServeur">
		<Login @onLogin="onLogin" />
	</div>
</template>

<script src="./login.js" />
<style src="../../theme-sombre.css"></style>
