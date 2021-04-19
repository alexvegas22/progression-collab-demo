<template>
	<h3>{{ convetirEtatEnString(avancement.état) }}</h3>
	<div v-if="this.tentatives.length > 0">
		<label for="avancement">Version de la solution:</label>
		<select name="avancement" id="avancement">
			<option disabled>
				Choisir une tentative précédente
			</option>
			<option
				v-for="elem in tentatives"
				v-bind:value="elem.date_soumission"
				v-on:click="chargerTentative(elem.liens.self)"
				id="{{elem.date_soumission}}"
				value="{{elem.date_soumission}}"
				
			>
				{{ convetirDateDepuisTimeStamp(elem.date_soumission) }} [{{elem.langage}}]
			</option>
		</select>
	</div>
</template>

<script src="./avancement.js"></script>
