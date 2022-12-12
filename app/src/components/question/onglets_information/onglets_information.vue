<template>
	<div class="row g-0">
		<Diptyque gauche="false" droite="false" size_gauche="25" size_droite="75">
			<template #gauche>
				<div class="section-tests">
					<div
						class="bordure-titre p-1 texte"
						style="display: flex; flex-flow: row"
							   :class="{ thème_sombre: thèmeSombre }"
					>
						<div style="flex-grow: 1">
							{{ $t("jeu_tests.jeuTests") }}
						</div>
						<i
							@click="réinitialiserTests"
										class="fa fa-refresh boutonRafraichissement"
						></i>
					</div>
					<FenêtreInfo
						class="panneau"
					>
						<div
							v-for="(test, index) in tests"
							:key="index"
						>
							<Test
								:test="test"
								:index="index"
								:réussi="resultats[index]"
								:non_réussi="resultats[index] == false"
								:sélectionné="index == index_select"
								présentation_étape="3.0"
								@select="select(index)"
							>
							    <template #lancement>
									<i
										class="fas btn-test-local"
											   :class="envoiTestUnique && index_envoi_unique==index  ?
											   'fa-cog fa-spin spin-test-local' :
											   'fa-play',
											   {disabled: envoiEnCours || envoiTestUnique && index_envoi_unique==index}"
											   @click="validerTest(index)"
									></i>
							    </template>
							</Test>
						</div>
					</FenêtreInfo>
				</div>
			</template>
			<template #droite>
				<div style="height: 100%; display: flex; flex-flow: column">
					<div class="section-onglets">
						<div
							id="onglet_ES"
							:class="{ onglets: true, 'onglet-sélectionné': ongletActif === 'ResultatTest', thème_sombre: thèmeSombre }"
							@click="changementOnglet('ResultatTest')"
						>
							{{ $t("onglets_informations.entrées/sorties") }}
						</div>
						<div
							v-if="resultat_select && resultat_select.sortie_erreur"
							:class="{ onglets: true, 'onglet-sélectionné': ongletActif === 'ErreursTest', thème_sombre: thèmeSombre }"
							class="onglets-subséquents"
							@click="changementOnglet('ErreursTest')"
						>
							{{ $t("onglets_informations.erreurs") }}
						</div>
						<div
							v-if="resultat_select"
							:class="{ onglets: true, 'onglet-sélectionné': ongletActif === 'DétailsTest', thème_sombre: thèmeSombre }"
							class="onglets-subséquents"
							@click="changementOnglet('DétailsTest')"
						>
							{{ $t("onglets_informations.détails") }}
						</div>
					</div>
					<keep-alive>
						<component
							:is="ongletActif"
							class="section-bas"
							:test="test_select"
							:résultat="resultat_select"
							:tempsÉxecution="test_select"
							:index="index_select"
						/>
					</keep-alive>
				</div>
			</template>
		</Diptyque>
	</div>
</template>

<script src="./onglets_information.js"></script>
<style scoped src="./onglets_information.css"></style>
