<template>
	<div class="dropdown">
		<div
			présentation_étape="4.0"
			class="dropdown-toggle"
			style="display: inline-block"
			type="button"
			id="menu_historique"
			data-bs-toggle="dropdown"
			aria-expanded="false"
		>
			{{ this.langage }}
		</div>
		<ul class="dropdown-menu" aria-labelledby="langage-dropdown" :class="{ thème_sombre: thèmeSombre }">
			<li class="dropdown-item dropdown-submenu" v-for="langage in langages" :key="langage">
				<a>{{ langage }}</a>
				<div class="dropdown-menu" :class="{ thème_sombre: thèmeSombre }" style="max-height: ">
					<button présentation_étape="4.1" class="dropdown-item" @click="this.reinitialiserCodeEditeur(langage)">
						{{ $t("avancement.ébauche_initiale") }}
					</button>
					<button
						présentation_étape="4.2"
						class="dropdown-item"
						v-for="elem in this.filtrerTentativesParLangage(langage)"
						@click="this.chargerTentative()"
						:value="elem.liens.self"
					>
						{{ this.timestampVersDate(elem.date_soumission) }}
						{{ elem.réussi ? "  &#9989;" : "  &#10060;" }}
					</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script src="./avancement.js"></script>
<style src="./avancement.css"></style>
