<template>
	<div  v-if="question">
		<div class="question">
			<Enonce/>
			<div></div>
			<div class="editeur-container">
				<div class="division">
					<EditeurCode />
					<ValidationTentative />
				</div>
				<div class="division retroaction-container" id="retroaction">
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
	</div>
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>
