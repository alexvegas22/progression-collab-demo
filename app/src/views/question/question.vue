<template>
	<div v-show="erreurs" class="alert alert-danger">
		{{$t("erreur.réseau")}}
	</div>
	<div v-if="question">
		<div class="container-fluid p-3">
			<div class="row">
				<div class="col-lg-4 col-md-6">
					<Enonce />
				</div>
				
				<div class="col-lg-8 col-md-6">
					<Avancement />
					<EditeurCode />
					<RetroactionTentative />
					<JeuTests class="p-2" />
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>
