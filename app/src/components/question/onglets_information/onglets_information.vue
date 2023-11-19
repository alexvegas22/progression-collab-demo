<template>
	<Diptyque gauche="fixe" droite="fixe" size_gauche="25" size_droite="75"
	>
		<template #gauche>
			<div class="section-tests">
				<div style="overflow: auto; flex-grow: 1;">
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
				</div>
				<div class="full-flex ffcolumn" style="align-items: center; height: fit-content">
					<BoutonSoumission/>
				</div>
			</div>
		</template>
		<template #droite>
			<v-card class="full-flex ffcolumn"
			>
				<div
					v-shortkey="raccourcis.itérerOngletsDroite"
					@shortkey="itérerOnglets(1)"
				/>
				<div
					v-shortkey="raccourcis.itérerOngletsGauche"
					@shortkey="itérerOnglets(-1)"
				/>
				<div >
					<v-tabs
						class="gris"
						density="compact"
						v-model="ongletActif"
					>
						<v-tab value="ResultatTest"
							:title="$t('onglets_informations.entrées/sorties.tooltip')"
						>
							{{ $t("onglets_informations.entrées/sorties.titre") }}
						</v-tab>
						<v-tab value="ErreursTest"
							:title="$t('onglets_informations.erreurs.tooltip')"
							v-show="resultat_select?.sortie_erreur"
						>
							{{ $t("onglets_informations.erreurs.titre") }}
						</v-tab>
						<v-tab value="DétailsTest"
							:title="$t('onglets_informations.détails.tooltip')"
							v-show="resultat_select?.temps_exécution"
						>
							{{ $t("onglets_informations.détails.titre") }}
						</v-tab>
					</v-tabs>
				</div>
				<div
					style="flex-grow: 1; height: calc(100% - 48px)"
				>
					<ResultatTest v-show="ongletActif=='ResultatTest'"
						:test="test_select"
						:résultat="resultat_select"
						:index="index_select"
						class="section-bas"/>
					<ErreursTest v-show="ongletActif=='ErreursTest'"
						:résultat="resultat_select"
						:index="index_select"
						class="section-bas"/>
					<DétailsTest v-show="ongletActif=='DétailsTest'"
						:résultat="resultat_select"
						:index="index_select"
						class="section-bas"/>
				</div>
			</v-card>
		</template>
	</Diptyque>
</template>

<script src="./onglets_information.js"></script>
<style scoped src="./onglets_information.css"></style>
