<template>
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
<<<<<<< HEAD
				</div>
				<JeuTests présentation_étape="4" class="p-2"/>
=======
				</div>	
				<JeuTests présentation_étape="4" class="p-2" />
>>>>>>> c585e108ee2c1e4f127c992b1bb84f266e1881e9
			</div>
		</div>
	</div>
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>

