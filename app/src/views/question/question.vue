<template>
	<div v-if="user">
		<Présentation v-if="démo" présentation_étape="00" />
	</div>
	<div class="container-fluid p-3">
		<div class="row" v-if="avancement">
			<div class="col-lg-4 col-md-6">
				<Enonce présentation_étape="0" />
				<button id="btn" @click="download">Sauvegarder</button>
			</div>
			
			<div class="col-lg-8 col-md-6">
				<Avancement présentation_étape="2" />
				<div v-if="tentative">
					<EditeurCode présentation_étape="1" style="height: 500px" />
					<RetroactionTentative présentation_étape="3" />
				</div>
			</div>
			<button id="btn" v-on:click="download">Sauvegarder</button>
		</div>
	</div>
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>
