<template>
	<div  v-if="question">
		<div class="container-fluid p-3">
			<div class="row">
			<div class="col-xl-4 col-md-6">
				<Enonce/>
				<div id="retroaction">
					<RetroactionTentative />
				</div>
			</div>
			<div class="col-xl-8 col-md-6">
				<EditeurCode />
				<ValidationTentative />
			</div>
			</div>
		</div>
		<div>
			<JeuTests />
		</div>
		<div v-if="avancement">
			<Avancement />
		</div>
	</div>
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>
