<template>
	<div v-if="tentative || tentativeEnCoursDeSoumission" class="accordion" id="accordionRésultat">


		<div v-if="retroactionTentative" class="progress" style="width: 100%">
			<div style="background-color: #9bd58e" v-bind:style="testsRéussisPct" class="progress-bar" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"/>
			<div style="background-color: #e3a5a5" v-bind:style="testsRatésPct" class="progress-bar" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"/>
		</div>
		<button id="btn_conseil">💡</button>

		<div id="tooltip" role="tooltip">
			<div v-show="msgReponseApi" class="alert alert-warning alert-dismissible fade show" role="alert">
				<strong>{{ $t("retroaction_tentative."+msgReponseApi) }}</strong>
			</div>
			<div v-if="retroactionTentative" class="p-2">
				<div v-if="retroactionTentative.feedback" class="p-2">
					💡 {{$t('retroaction_tentative.conseil')}} <div class="feedback" v-html="retroactionTentative.feedback"/>
				</div>
				<div v-else>
					{{$t('retroaction_tentative.soumettre')}}
				</div>
			</div>
			<div v-else>
				{{$t('retroaction_tentative.soumettre')}}
			</div>
		</div>

	</div>

</template>

<script src="./retroaction_tentative.js"></script>
<style src="./retroaction_tentative.css"></style>
