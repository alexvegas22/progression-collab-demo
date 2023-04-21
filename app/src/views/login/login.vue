<template>
	<BoiteDeDialogue
		:visible="validation"
		:messageDeValidation="$t('validation_courriel.échouée')"
		@onReponse="onReponse"
	/>

	<div v-if="configServeur">
		<Login @onLogin="onLogin" />
	</div>
</template>

<script src="./login.js" />
<style src="../../css/mainMenu.css"></style>
