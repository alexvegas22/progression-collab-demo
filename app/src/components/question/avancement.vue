<template>
	<div v-if="avancement.état >= 0">
		<h3>{{ convetirEtatEnString(avancement.état) }}</h3>
		<div v-if="avancement.état === 0">
			<p>Aucune tentative précédente</p>
		</div>
		<div>
			<label for="avancement">Version de la solution:</label>
			<select name="avancement" id="avancement">
				<option v-if="(this.tentatives.length === 0) && !this.derniereTentative" disabled selected>
					Choisir une tentative précédente
				</option>
				<option v-else disabled>Choisir une tentative précédente</option>
				<option
					v-if="this.derniereTentative"
					v-on:click="chargerTentative(this.derniereTentative.liens.self)"
					value="{{this.derniereTentative.date_soumission}}"
					
				>
					Tentative du
					{{ convetirDateDepuisTimeStamp(this.derniereTentative.date_soumission) }}
				</option>
				<option
					v-for="tentative in this.chargerTentativesSaufPlusRecnte()"
					v-bind:key="tentative.date_soumission"
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
