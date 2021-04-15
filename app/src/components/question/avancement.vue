<template>
	<div v-if="avancement.état >= 0">
		<h3>{{ convetirEtatEnString(avancement.état) }}</h3>
		<div v-if="avancement.état === 0">
			<p>{{$t('avancement.aucuneTentative')}}</p>
		</div>
		<div>
			<label for="avancement">{{$t('avancement.versionTentative')}}</label>
			<select name="avancement" id="avancement" v-model="selected">
				<option>
					{{$t('avancement.choisirTentative')}}
				</option>
				<option
					v-for="tentative in tentatives"
					v-bind:value="tentative.date_soumission"
					v-on:click="chargerTentative(tentative.liens.self)"
				>
					{{$t('avancement.dateTentative')}}
					{{ convetirDateDepuisTimeStamp(tentative.date_soumission) }}
				</option>
			</select>
		</div>
	</div>
</template>

<script src="./avancement.js"></script>
