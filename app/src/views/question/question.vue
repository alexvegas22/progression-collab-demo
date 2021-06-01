<template>
	<div v-show="erreurs" class="alert alert-danger">
		{{$t("erreur.réseau")}}
	</div>
	<div v-if="question">
		<div class="container-fluid p-3">
			<div class="row">
				<div class="col-xl-4 col-md-6">
					<div style="overflow: auto; height: 600px">
						<Enonce />
					</div>
					<div id="retroaction">
						<RetroactionTentative />
					</div>
				</div>
				
				<div class="col-xl-8 col-md-6">
					<Avancement style="position: absolute; right: 80px" />
					<EditeurCode />
					<JeuTests />
				</div>
			</div>
		</div>
	</div>
	
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>
