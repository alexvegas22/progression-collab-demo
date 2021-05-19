<template>
	<h3>{{ $t('avancement.'+étatVersChaîne(avancement.état)) }}</h3>
	<div v-if="this.tentatives.length > 0">
		<label for="avancement">{{$t('avancement.versionTentative')}}</label>
		<select name="avancement" id="avancement" v-on:change="this.chargerTentative()">
			<option disabled>{{$t('avancement.choisirTentative')}}</option>
			<optgroup 
				v-for="langage in this.langages"
				v-bind:key="langage"
				:label="langage"
			>
				<option
					v-for="elem in this.filtrerTentativesParLangage(langage)"
					:value="elem.liens.self"
				>
					{{ this.timestampVersDate(elem.date_soumission) }} {{ elem.réussi ? "  &#9989;" : "  &#10060;" }}
				</option>
			</optgroup>
		</select>
	</div>
</template>

<script src="./avancement.js"></script>
