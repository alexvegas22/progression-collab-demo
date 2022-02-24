<template>
	<div v-if="user">
		<Présentation v-if="démo" présentation_étape="00" />
	</div>
	<div>
		<input class="form-check-input" type="checkbox" v-model="themeSombre" />
	</div>

	<div class="container-fluid p-3" :class="{thème_Sombre: themeSombre}">
		
		<div class="row" v-if="avancement">
			<div class="col-lg-4 col-md-6" :class="{thème_Sombre_enoncé: themeSombre}">
				<Enonce présentation_étape="0" />
			</div>
			
			<div class="col-lg-8 col-md-6">
				<Avancement présentation_étape="2" />
				<div v-if="tentative" >
					<EditeurCode présentation_étape="1" style="height: 500px" />
					<RetroactionTentative présentation_étape="3" />
				</div>
				<JeuTests présentation_étape="4" class="p-2" :class="{thème_Sombre_enoncé: themeSombre}"/>
			</div>
		</div>
	</div>
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>
