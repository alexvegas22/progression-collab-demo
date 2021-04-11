<template>
	<div v-if="avancement.état">
		<h3>{{ convetirEtatEnString(avancement.état) }}</h3>
		<div v-if="avancement.état === 0">
			<p>Aucune tentative précédente</p>
		</div>
		<div v-else>
			<label for="avancement">Version de la solution:</label>
			<select name="avancement" id="avancement">
				<option disabled selected>Choisir une tentative précédente</option>
				<option
					v-bind:key="tentative.date_soumission"
					v-for="tentative in tentatives"
					v-on:click="chargerTentative(tentative.liens.self)"
					value="{{tentative.date_soumission}}"
				>
					Tentative du
					{{ convetirDateDepuisTimeStamp(tentative.date_soumission) }}
				</option>
			</select>
		</div>
	</div>
</template>

<script src="./avancement.js"></script>
