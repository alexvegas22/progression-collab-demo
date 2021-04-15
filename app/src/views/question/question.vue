<template>
	<div class="question">
		<Enonce v-bind:titre="question.titre" v-bind:enonce="question.énoncé" />
		<div></div>
		<div class="editeur-container">
			<div class="division">
				<EditeurCode />
				<ValidationTentative />
			</div>
			<div v-if="afficherRetroaction" class="division retroaction-container" id="retroaction">
				<RetroactionTentative />
			</div>
		</div>
	</div>
	<div>
		<JeuTests />
	</div>
	<div>
		<Avancement />
	</div>
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>
