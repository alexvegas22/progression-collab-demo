<template>
	<h3>{{ convetirEtatEnString(avancement.état) }}</h3>
	<div v-if="this.tentatives.length > 0">
		<label for="avancement">Version de la solution:</label>
		<select name="avancement" id="avancement">
			<option disabled>
				Choisir une tentative précédente
			</option>
			<option
				v-for="tentative in tentatives"
				v-bind:value="tentative.date_soumission"
				v-on:click="chargerTentative(tentative.liens.self)"
				id="{{tentative.date_soumission}}"
				value="{{tentative.date_soumission}}"
				
			>
				{{ convetirDateDepuisTimeStamp(tentative.date_soumission) }} [{{tentative.langage}}]
			</option>
		</select>
	</div>
</template>

<script src="./avancement.js"></script>
