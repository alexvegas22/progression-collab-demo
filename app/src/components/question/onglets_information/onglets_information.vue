<template>
	<Diptyque gauche="fixe" droite="fixe" size_gauche="25" size_droite="75"
	>
		<template #gauche>
			<div class="section-tests">
				<div style="overflow: scroll; flex-grow: 1">
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
				<div>
					<BoutonSoumission/>
				</div>
			</div>
		</template>
		<template #droite>
			<v-card class="full-flex column">
				<div >
					<v-tabs
						density="compact"
						v-model="ongletActif"
					>
						<v-tab value="ResultatTest">
							{{ $t("onglets_informations.entrées/sorties") }}
						</v-tab>
						<v-tab value="ErreursTest">
							{{ $t("onglets_informations.erreurs") }}
						</v-tab>
						<v-tab value="DétailsTest">
							{{ $t("onglets_informations.détails") }}
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
