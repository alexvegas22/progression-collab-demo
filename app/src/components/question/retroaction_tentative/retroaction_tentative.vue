<template>
	<div>
		<Ampoule
			v-if="tentative?.feedback"
			class="rétroaction-générale"
			:feedback="tentative?.feedback"
			:estVisible="true"
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
<style scoped src="./retroaction_tentative.css"></style>
