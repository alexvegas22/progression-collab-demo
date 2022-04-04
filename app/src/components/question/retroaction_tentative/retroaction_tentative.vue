<template>
	<div>
		<div
			class="progress"
			présentation_étape="2.0"
		>
			<div
				:style="testsRéussisPct"
				class="progress-bar test_réussi"
				role="progressbar"
				aria-valuemin="0"
				aria-valuemax="100"
			/>
			<div
				:style="testsRatésPct"
				class="progress-bar test_non_réussi"
				role="progressbar"
				aria-valuemin="0"
				aria-valuemax="100"
			/>
		</div>

		<div v-if="retroactionTentative && retroactionTentative.feedback">
			<teleport to="#carre-editeur">
				<div class="espace-ampoule">
					<Tippy
						ref="tippy"
						v-tippy="{ trigger: 'click', interactive: true }"
						:aria="true"
						:show-on-create="true"
						:arrow="true"
						:show="conseilAffiché"
						placement="bottom"
						class="popup_conseil"
						@show="basculerAffichageConseil"
					>
						<a id="btn_conseil">
							<svg
								class="svg_ampoule"
								présentation_étape="2.1"
							>
								<use xlink:href="./svg_ampoule/light-bulb-invention-svgrepo-com.svg#Capa_1" />
							</svg>
						</a>

						<template #content>
							<svg class="svg_ampoule_mini">
								<use xlink:href="./svg_ampoule/light-bulb-invention-svgrepo-com.svg#Capa_1" />
							</svg>
							{{ $t("retroaction_tentative.conseil") }}
							<!-- eslint-disable -->
							<div
							    class="feedback"
							    v-html="retroactionTentative.feedback"
							/>
							<!-- eslint-enable -->
						</template>
					</Tippy>
				</div>
			</teleport>
		</div>
	</div>
</template>

<script src="./retroaction_tentative.js"></script>
<style src="./retroaction_tentative.css"></style>
