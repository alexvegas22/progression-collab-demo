<template>
	<BoîteConfirmation
		:esVisible="courrielValidé"
		:titre="$t('dialogues.boiteDeDialogue.erreurSurvenue')"
		:message="$t('validation_courriel.échouée')"
		@onRéponse="onRéponse"
	/>

	<div v-if="configServeur">
		<Login @onLogin="onLogin" />
	</div>
</template>

<script src="./login.js" />
<style src="../../css/mainMenu.css"></style>
