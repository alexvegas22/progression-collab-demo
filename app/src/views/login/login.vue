<template>
	<BoiteDeDialogue
		:visible="validation"
		:messageDeValidation="messageDeValidation"
		@reponse="onReponse"
	/>

	<div v-if="configServeur">
		<Login @onLogin="onLogin" />
	</div>
</template>

<script src="./login.js" />
<style src="../../css/mainMenu.css"></style>
