<template>
	<div class="dropdown">
		<button class="btn btn-secondary dropdown-toggle" type="button" id="menu_historique" data-bs-toggle="dropdown" aria-expanded="false">
			{{this.langage}}
		</button>
		<ul class="dropdown-menu" aria-labelledby="menu_historique">
			<li v-for="langage in this.langages" :key="langage">
				<button class="dropdown-item disabled" présentation_étape="4.0">{{langage}}</button>
				<ul>
					<li><button class="dropdown-item" @click="this.reinitialiserCodeEditeur(langage)"  présentation_étape="4.1">{{ $t('avancement.ébauche_initiale') }}</button></li>
					<li v-if="!this.modeCréation" v-for="elem in this.filtrerTentativesParLangage(langage)">
						<button class="dropdown-item" @click="this.chargerTentative()" :value="elem.liens.self"  présentation_étape="4.2">
							{{ this.timestampVersDate(elem.date_soumission) }} {{ elem.réussi ? "  &#9989;" : "  &#10060;" }}
						</button>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script src="./avancement.js"></script>
