<template>
	<div class="espace-ampoule" v-show="estVisible">
		<Tippy
			trigger='click'
			interactive
			:aria="true"
			:show-on-create="true"
			:arrow="true"
			:show="conseilAffiché"
			placement="bottom-end"
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
					v-html="feedback_md"
				/>
				<!-- eslint-enable -->
			</template>
		</Tippy>
	</div>
</template>

<script src="./ampoule.js"></script>
<style scoped src="./ampoule.css"></style>
