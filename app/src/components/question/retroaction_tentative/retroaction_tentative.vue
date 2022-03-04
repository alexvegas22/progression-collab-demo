<template>
	<div>
		<div class="progress" présentation_étape="2.0">
			<div
				v-bind:style="testsRéussisPct"
				class="progress-bar test_réussi"
				role="progressbar"
				aria-valuemin="0"
				aria-valuemax="100"
			/>
			<div
				v-bind:style="testsRatésPct"
				class="progress-bar test_non_réussi"
				role="progressbar"
				aria-valuemin="0"
				aria-valuemax="100"
			/>
		</div>

		<div v-if="retroactionTentative && retroactionTentative.feedback">
			<Tippy
				ref="tippy"
				v-tippy="{ trigger: 'click', interactive: true }"
				:aria="true"
				:showOnCreate="true"
				:arrow="true"
				:show="conseilAffiché"
				placement="bottom"
				class="popup_conseil"
				@show="basculerAffichageConseil"
				présentation_étape="2.1"
			>
				<a id="btn_conseil">
					<svg class="svg_ampoule">
						<use xlink:href="./svg_ampoule/light-bulb-invention-svgrepo-com.svg#Capa_1"></use>
					</svg>
				</a>
>>>>>>> 5f79c3ca7d55a0c4809797eacf79e40622964156

				<template #content>
					<svg class="svg_ampoule_mini">
						<use xlink:href="./svg_ampoule/light-bulb-invention-svgrepo-com.svg#Capa_1"></use>
					</svg>
					{{ $t("retroaction_tentative.conseil") }}
					<div class="feedback" v-html="retroactionTentative.feedback" />
				</template>
			</Tippy>
		</div>
	</div>
</template>

<script src="./retroaction_tentative.js"></script>
<style src="./retroaction_tentative.css"></style>
