<template>
	<div>
		<div class="progress" présentation_étape="2.0">
			<div v-bind:style="testsRéussisPct" class="progress-bar test_réussi" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"/>
			<div v-bind:style="testsRatésPct" class="progress-bar test_non_réussi" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"/>
		</div>


		<div v-if="retroactionTentative && retroactionTentative.feedback">
			<Tippy ref="tippy" :aria="true" :showOnCreate="true" :arrow="true" placement="bottom" class="popup_conseil" v-on:show="montrerConseil" présentation_étape="2.1">
			<a id="btn_conseil" >
				<svg  class="svg_ampoule">
					<use xlink:href="./svg_ampoule/light-bulb.svg#icon-light-bulb"></use>
				</svg>
			</a>

			<template  #content>
				💡 {{$t('retroaction_tentative.conseil')}} <div class="feedback" v-html="retroactionTentative.feedback"/>
			</template>
			</Tippy>
		</div>
	</div>

</template>

<script src="./retroaction_tentative.js"></script>
<style src="./retroaction_tentative.css"></style>
