<template>
    <div class="row g-0">
		<div class="col-xl-3 col-lg-4 col-4">
			<div class="section-tests">
				<div class="bordure-titre p-1" :class="{ thème_sombre: thèmeSombre }">
					{{ $t("jeu_tests.jeuTests") }}
				</div>
				<fenetre-info class="panneau" :class="{'panneau-afficher': panneauAfficher}">
					<div v-for="(test, index) in tests" :key="index">
						<Test
							v-bind:test="test"
							v-bind:index="index"
							v-bind:réussi="resultats[index]"
							v-bind:non_réussi="resultats[index] == false"
							v-bind:sélectionné="index == index_select"
							v-on:select="select(index)"
							présentation_étape="3.0"
						/>
					</div>
				</fenetre-info>
			</div>
		</div>

		<div class="col-xl-9 col-lg-8 col-8">
			<div class="section-onglets">
				<div
					@click="changementOnglet('ResultatTest')"
					:class="{ onglets: true, 'onglet-sélectionné': ongletActif === 'ResultatTest', thème_sombre: thèmeSombre }"
				>
					{{ $t("onglets_informations.entrées/sorties") }}
				</div>

				<div
					@click="changementOnglet('SectionErreur')"
					:class="{ onglets: true, 'onglet-sélectionné': ongletActif === 'SectionErreur', thème_sombre: thèmeSombre }"
					v-if="resultat_select && resultat_select.sortie_erreur"
				>
					{{ $t("onglets_informations.erreurs") }}
				</div>

				<div
					@click="changementOnglet('Rétroactions')"
					:class="{ onglets: true, 'onglet-sélectionné': ongletActif === 'Rétroactions', thème_sombre: thèmeSombre }"
					v-if="resultat_select && resultat_select.feedback"
				>
					{{ $t("onglets_informations.rétroactions") }}
				</div>
				<div style="margin-left: auto">
					<i
						style="height: 100%"
						@click="basculerPanneau()"
						class="fa fa btn-affichage"
						:class="{ 'fa-window-minimize': panneauAffiché, 'fa-window-restore': !panneauAffiché }"
					></i>
				</div>
			</div>

			<keep-alive>
				<component
					:is="ongletActif"
					:style="{ height: panneauAffiché ? '20rem' : '0' }"
					class="section-bas"
					:test="test_select"
					:resultat="resultat_select"
				></component>
			</keep-alive>
		</div>
    </div>
</template>

<script src="./onglets_information.js"></script>

<style scoped src="./onglets_information.css"></style>
