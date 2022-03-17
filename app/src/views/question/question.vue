<template>
<div>
	<div v-if="user">
		<Présentation v-if="démo" présentation_étape="00" />
	</div>
	<div class="container-fluid p-3" :class="{thème_sombre: thèmeSombre}">
		<div class="row" v-if="avancement">
			<div class="col-lg-4 col-md-6">
				<Enonce présentation_étape="0" />
			</div>
			
			<div class="col-lg-8 col-md-6">
				<Avancement présentation_étape="2" />
				<div v-if="tentative">
					<EditeurCode présentation_étape="1" style="height: 500px" />
					<RetroactionTentative présentation_étape="3" />
				</div>
				<JeuTests présentation_étape="4" class="p-2"/>
			</div>
		</div>
		<button v-if="this.modeÉdition" class="btn btn-info text-white" id="btn" v-on:click="télécharger">Sauvegarder 💾</button>
	</div>
	</div>
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>

