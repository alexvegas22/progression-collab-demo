<template>
	<div class="question">
		<Enonce v-bind:question="question" />
		<div></div>
		<div class="editeur-container">
			<div class="division">
				<EditeurCode />
				<ValidationTentative v-bind:uri="this.uri" v-bind:username="this.username" />
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
