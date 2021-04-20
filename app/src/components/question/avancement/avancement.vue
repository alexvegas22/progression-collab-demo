<template>
	<h3>{{ convetirEtatEnString(avancement.état) }}</h3>
	<div v-if="this.tentatives.length > 0">
		<label for="avancement">Version de la solution:</label>
		<select name="avancement" id="avancement">
			<option disabled>Choisir une tentative précédente</option>
			<optgroup 
				v-for="langage in this.langages"
				v-bind:key="langage"
				:label="langage"
			>
				<option
					v-for="elem in this.filtrerTentativesParLangage(langage)"
					v-bind:value="elem.date_soumission"
					v-on:click="this.chargerTentative(elem.liens.self)"
					id="{{elem.date_soumission}}"
					value="{{elem.date_soumission}}"
				>
					{{ this.convetirDateDepuisTimeStamp(elem.date_soumission) }} {{ elem.réussi ? "  &#9989;" : "  &#10060;" }}
				</option>
			</optgroup>
		</select>
	</div>
</template>

<script src="./avancement.js"></script>
