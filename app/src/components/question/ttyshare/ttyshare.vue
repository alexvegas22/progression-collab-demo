<template>
	<BoîteConfirmation
		:montrer="confirmerRéinitialisation"
		:titre="$t('ttyshare.réinitialiser')"
		:message="$t('ttyshare.confirmation_réinitialiser')"
		@onRéponse="onConfirmerRéinitialisation"
	/>

	<div id="wrap">
		<div v-show="enChargement" class="loader-parent">
			<div v-show="enChargement" class="loader">
			</div>
		</div>

		<iframe :src="url" id="frame">
		</iframe>
	</div>
	<div>
		<v-icon
			icon="mdi-launch"
			style="position: fixed; top: 100px; right: 10px; color: white"
			@click="extraire_terminal"
		/>
		<v-btn
			@click="réinitialiser">
			{{ $t('ttyshare.réinitialiser') }}
		</v-btn>
	</div>
</template>
<script src="./ttyshare.js"></script>
<style scoped src="./ttyshare.css"></style>
