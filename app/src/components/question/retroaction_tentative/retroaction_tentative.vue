<template class="p-4">
	<div v-if="msgReponseApi" class="alert alert-warning alert-dismissible fade show" role="alert">
		<strong>{{ $t("retroaction_tentative."+msgReponseApi) }}</strong>
	</div>
	<div v-if="retroactionTentative">
		<div v-show="!tentativeEnCoursDeSoumission" class="p-2">
			<h3 v-if="retroactionTentative.réussi">
				<span style="color: green">{{$t('retroaction_tentative.bonneRéponse')}}</span> 👍</h3>
			<h3 v-else>
				<span style="color: red">{{$t('retroaction_tentative.mauvaiseRéponse')}}</span> 😢</h3>
			<div>
				💡 {{$t('retroaction_tentative.nbTestsValidés')}}
				<span style="color: green">
					<strong>{{ testsRéussisPct }} %</strong>
				</span>
			</div>
			<div v-show="retroactionTentative.feedback">
				💡 {{$t('retroaction_tentative.conseil')}} <div class="feedback" v-html="retroactionTentative.feedback"/>
			</div>
		</div>
	</div>
</template>

<script src="./retroaction_tentative.js"></script>
<style src="./retroaction_tentative.css"></style>
