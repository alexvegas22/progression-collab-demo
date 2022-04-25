<template>
	<div>
		<Ampoule
			v-if="retroactionTentative?.feedback"
			class="rétroaction-générale"
			:feedback="retroactionTentative?.feedback"
		/>
	</div>
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
	</div>
</template>

<script src="./retroaction_tentative.js"></script>
<style src="./retroaction_tentative.css"></style>
