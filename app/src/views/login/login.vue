<template>
	<div v-if="messageDeValidation">
		{{ messageDeValidation }}
	</div>
	<div v-if="configServeur">
		<Login @onLogin="onLogin" />
	</div>
</template>

<script src="./login.js" />
<style src="../../css/mainMenu.css"></style>
