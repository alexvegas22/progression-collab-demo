<template>
	<div>
		<div class="progress" présentation_étape="2.0">
			<div v-bind:style="testsRéussisPct" class="progress-bar test_réussi" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"/>
			<div v-bind:style="testsRatésPct" class="progress-bar test_non_réussi" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"/>
		</div>

		<div v-show="retroactionTentative && retroactionTentative.feedback">
			<Tippy v-if="retroactionTentative" :interactive="true" :showOnCreate="true" :arrow="true" placement="bottom" class="popup_conseil"   présentation_étape="2.1">
			<a id="btn_conseil">💡</a>

			<template #content>
				💡 {{$t('retroaction_tentative.conseil')}} <div class="feedback" v-html="retroactionTentative.feedback"/>
			</template>
			</Tippy>
		</div>
	</div>

</template>

<script src="./retroaction_tentative.js"></script>
<style src="./retroaction_tentative.css"></style>
