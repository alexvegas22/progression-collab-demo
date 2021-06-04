<template>
	<div>
		<div class="progress">
			<div v-bind:style="testsRéussisPct" class="progress-bar test_réussi" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"/>
			<div v-bind:style="testsRatésPct" class="progress-bar test_non_réussi" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"/>
		</div>

		<tippy v-if="retroactionTentative" :interactive="true" :showOnCreate="true" :arrow="true" class="popup_conseil">
			<a id="btn_conseil" v-show="retroactionTentative && retroactionTentative.feedback">💡</a>

			<template #content>
					<div v-if="msgReponseApi">
						<strong>{{ $t("retroaction_tentative."+msgReponseApi) }}</strong>
					</div>
					<div v-if="retroactionTentative">
						<div v-if="retroactionTentative.feedback">
							💡 {{$t('retroaction_tentative.conseil')}} <div class="feedback" v-html="retroactionTentative.feedback"/>
						</div>
						<div v-else>
							{{$t('retroaction_tentative.soumettre')}}
						</div>
					</div>
					<div v-else>
						{{$t('retroaction_tentative.soumettre')}}
					</div>
			</template>
		</tippy>
	</div>

</template>

<script src="./retroaction_tentative.js"></script>
<style src="./retroaction_tentative.css"></style>
