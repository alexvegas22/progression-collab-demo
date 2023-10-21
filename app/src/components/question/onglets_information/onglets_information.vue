<template>
	<div class="row g-0">
		<Diptyque gauche="fixe" droite="fixe" size_gauche="25" size_droite="75">
			<template #gauche>
				<div class="section-tests">
					<div
						class="p-1 texte"
						style="display: flex; flex-flow: row; align-items: center"
						:class="{ thème_sombre: thèmeSombre }"
					>
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
								:résultat="resultats[index]"
								:sélectionné="index == index_select"
								présentation_étape="3.0"
								@select="select(index)"
							>
								<template #lancement>
									<div v-if="question_type!='sys'">
										<v-icon
											v-if="envoiEnCours || envoiTestUnique && tests[index]?.envoyé"
											icon="mdi-cog mdi-spin"
											class="btn-test-local disabled"
											:title="$t('jeu_tests.exécuter')"
											@click="validerTest(index)"
										/>
										<v-icon
											v-else
											icon="mdi-play"
											class="btn-test-local"
											:title="$t('jeu_tests.exécuter')"
											@click="validerTest(index)"
										/>
									</div>
								</template>
							</Test>
						</div>
					</FenêtreInfo>
					<BoutonSoumission
						:title="$t(question_type=='prog' ? 'validation_tentative.boutonSoumettre' : 'validation_tentative_boutonValider')"
					/>
				</div>
			</template>
			<template #droite>
				<div style="height: 100%; display: flex; flex-flow: column">
					<div class="section-onglets"
						v-shortkey="raccourcis.itérerOnglets"
						@shortkey="itérerOnglets"
					>
						<div
							id="onglet_ES"
							:class="{ onglets: true, 'onglet-sélectionné': ongletActif === 'ResultatTest', thème_sombre: thèmeSombre }"
							@click="changerOnglet('ResultatTest')"
						>
							{{ $t("onglets_informations.entrées/sorties") }}
						</div>
						<div
							v-if="resultat_select && resultat_select.sortie_erreur"
							:class="{ onglets: true, 'onglet-sélectionné': ongletActif === 'ErreursTest', thème_sombre: thèmeSombre }"
							class="onglets-subséquents"
							@click="changerOnglet('ErreursTest')"
						>
							{{ $t("onglets_informations.erreurs") }}
						</div>
						<div
							v-if="resultat_select"
							:class="{ onglets: true, 'onglet-sélectionné': ongletActif === 'DétailsTest', thème_sombre: thèmeSombre }"
							class="onglets-subséquents"
							@click="changerOnglet('DétailsTest')"
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
