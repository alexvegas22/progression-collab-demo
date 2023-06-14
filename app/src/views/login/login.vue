<template>
	<BoîteInfo
		:montrer="validationRéussie"
		:titre="$t('validationCourriel.titreSuccès')"
		:message="messageInformation"
	/>
	<BoîteConfirmation
		:montrer="erreurDeValidation"
		:titre="$t('validationCourriel.titreÉchec')"
		:message="$t('validationCourriel.échouée')"
		@onRéponse="onRéponse"
	/>
	<div v-if="configServeur">
		<Login
			@onLogin="onLogin"
			@onInscrire="onInscrire"
		/>
	</div>
</template>

<script src="./login.js" />
<style src="../../css/mainMenu.css"></style>
