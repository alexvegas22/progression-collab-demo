<template>
	<div v-if="configServeur">
		<BoîteInfo
			:montrer="erreurInscription"
			:titre="$t('validationCourriel.titreÉchec')"
			:message="messageInformation"
		/>
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
		<Login
			@onLogin="onLogin"
			@onInscrire="onInscrire"
			:ongletSélectionné="ongletSélectionné"
		/>
	</div>
</template>

<script src="./login.js" />
<style src="../../css/mainMenu.css"></style>
