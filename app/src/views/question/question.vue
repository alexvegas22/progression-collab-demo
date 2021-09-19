<template>
	<div v-show="erreurs" class="alert alert-danger">
		{{$t("erreur.réseau")}}
	</div>
	<div v-if="user">
		<div class="container-fluid p-3">
			<div class="row" v-if="avancement">
				<div class="col-lg-4 col-md-6">
					<Enonce />
				</div>
				
				<div class="col-lg-8 col-md-6">
					<Avancement />
					<div v-if="tentative">
						<EditeurCode style="height: 500px" />
						<RetroactionTentative />
					</div>
					<JeuTests class="p-2" />
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>
