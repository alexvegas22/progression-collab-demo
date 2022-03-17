<template>
	<div class="dropdown">
		<div
			class="dropdown-toggle d-inline-block"
			type="button"
			id="menu_historique"
			data-bs-toggle="dropdown"
			aria-expanded="false"
		>
			Langages ({{ this.langage }})
		</div>
		<ul class="dropdown-menu" aria-labelledby="testeurite" :class="{ thème_sombre: thèmeSombre }">
			<li class="dropdown-item dropdown-submenu" v-for="langage in langages" :key="langage">
				<a>{{ langage }}</a>
				<div class="dropdown-menu" :class="{ thème_sombre: thèmeSombre }">
					<perfect-scrollbar>
						<button class="dropdown-item" @click="this.reinitialiserCodeEditeur(langage)">
							{{ $t("avancement.ébauche_initiale") }}
						</button>
						<button
							class="dropdown-item"
							v-for="elem in this.filtrerTentativesParLangage(langage)"
							@click="this.chargerTentative()"
							:value="elem.liens.self"
							:key="elem.date_soumission"
						>
							{{ this.timestampVersDate(elem.date_soumission) }}
							{{ elem.réussi ? "  &#9989;" : "  &#10060;" }}
						</button>
					</perfect-scrollbar>
				</div>
			</li>
		</ul>
	</div>
</template>

<script src="./avancement.js"></script>
<style src="./avancement.css"></style>
