<template>
	<div class="d-flex" style="flex-flow: row">
		<div class="dropdown" >
			<div
				présentation_étape="4.0"
				class="dropdown-toggle"
				type="button"
				id="menu_historique"
				style="display: inline-block"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				{{ this.langage }}
			</div>
			<ul id="langage-dropdown" class="dropdown-menu" aria-labelledby="langage-dropdown" :class="{ thème_sombre: thèmeSombre }">
				<li class="dropdown-item dropdown-submenu" v-for="langage in langages" :key="langage">
					<a>{{ langage }}</a>
					
					<div class="dropdown-menu langage-submenu" :class="{ thème_sombre: thèmeSombre }">
						<perfect-scrollbar>
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
						</perfect-scrollbar>
					</div>
				</li>
			</ul>
		</div>
		<div style="margin-left: auto">
			<i
				@click="$emit('basculéPanneauÉditeur')"
				class="fa btn-affichage"
				:class="{ 'fa-window-restore': pleinÉcran, 'fa-window-maximize': !pleinÉcran }"
			>
			</i>
		</div>
	</div>
</template>

<script src="./avancement.js"></script>
<style src="./avancement.css"></style>
