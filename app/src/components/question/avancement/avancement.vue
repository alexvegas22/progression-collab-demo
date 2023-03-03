<template>
	<div
		class="d-flex"
		style="flex-flow: row"
	>
		<div class="barre-menu-langage">
			<div
				id="menu_historique"
				présentation_étape="4.0"
				class="dropdown-toggle"
				type="button"
				style="display: inline-block"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				{{ langage }}
			</div>
			<ul
				id="langage-dropdown"
				class="dropdown-menu"
				aria-labelledby="langage-dropdown"
				:class="{ thème_sombre: thèmeSombre }"
			>
				<li
					v-for="langage in langages"
					:key="langage"
					class="dropdown-item dropdown-submenu"
				>
					<a>{{ langage }}</a>
					
					<div
						class="dropdown-menu langage-submenu"
						:class="{ thème_sombre: thèmeSombre }"
					>
						<perfect-scrollbar>
							<button
								présentation_étape="4.1"
								class="dropdown-item"
								@click="reinitialiserCodeEditeur(langage)"
							>
								{{ $t("avancement.ébauche_initiale") }}
							</button>
							<button
								v-for="elem in filtrerTentativesParLangage(langage)"
								:key="elem.liens.self"
								présentation_étape="4.2"
								class="dropdown-item"
								:value="elem.liens.self"
								@click="chargerTentative()"
							>
								{{ timestampVersDate(elem.date_soumission) }}
								{{ elem.réussi ? "  &#9989;" : "  &#10060;" }}
							</button>
						</perfect-scrollbar>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script src="./avancement.js"></script>
<style src="./avancement.css"></style>
