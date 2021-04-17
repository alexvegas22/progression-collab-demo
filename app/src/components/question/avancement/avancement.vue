<template>
	<h3>{{ convetirEtatEnString(avancement.état) }}</h3>
	<div v-if="avancement.état === 0">
		<p>Aucune tentative précédente</p>
	</div>
	<div>
		<label for="avancement">Version de la solution:</label>
		<select name="avancement" id="avancement" v-model="selected">
			<option>
				Choisir une tentative précédente
			</option>
			<option
				v-for="tentative in tentatives"
				v-bind:value="tentative.date_soumission"
				v-on:click="chargerTentative(tentative.liens.self)"
			>
				{{ convetirDateDepuisTimeStamp(tentative.date_soumission) }} [{{tentative.langage}}]
			</option>
		</select>
	</div>
</template>

<script src="./avancement.js"></script>
