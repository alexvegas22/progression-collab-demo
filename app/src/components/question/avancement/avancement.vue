<template>
	<div class="container">
		<div class="row" >
			<div v-if="this.tentatives.length > 0" >
				<select name="avancement" id="avancement" v-on:change="this.chargerTentative()">
					<option disabled>{{$t('avancement.choisirTentative')}}</option>
					<option @click="this.reinitialiserCodeEditeur()">Réinitialiser</option>
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
		</div>

		<div >
			<button
				type="button"
				class="btn btn-info btn-reset"
				@click="this.reinitialiserCodeEditeur()"
			>
				⟲
			</button>
		</div>
	</div>		
</template>

<script src="./avancement.js"></script>
