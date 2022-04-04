<template>
	<div class="row g-0">
		<div class="col-3">
			<div class="section-tests">
				<FenêtreInfo
					:style="{ height: panneauAffiché ? '20rem' : '0' }"
					class="section-bas"
				>
					<template #titre>
						{{ $t("jeu_tests.jeuTests") }}
					</template>
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
						/>
					</div>
				</FenêtreInfo>
			</div>
		</div>
		<div class="col-9">
			<div class="section-onglets">
				<div
					:class="{ onglets: true, sélectionné: ongletActif === 'ResultatTest', thème_sombre: thèmeSombre }"
					@click="changementOnglet('ResultatTest')"
				>
					{{ $t("onglets_informations.entrées/sorties") }}
				</div>

				<div
					v-if="resultat_select && resultat_select.sortie_erreur"
					:class="{ onglets: true, sélectionné: ongletActif === 'SectionErreur', thème_sombre: thèmeSombre }"
					@click="changementOnglet('SectionErreur')"
				>
					{{ $t("onglets_informations.erreurs") }}
				</div>

				<div
					v-if="resultat_select && resultat_select.feedback"
					:class="{ onglets: true, sélectionné: ongletActif === 'Rétroactions', thème_sombre: thèmeSombre }"
					@click="changementOnglet('Rétroactions')"
				>
					{{ $t("onglets_informations.rétroactions") }}
				</div>
				<div style="margin-left: auto">
					<i
						style="height: 100%"
						class="fa fa btn-affichage"
						:class="{ 'fa-window-minimize': panneauAffiché, 'fa-window-restore': !panneauAffiché }"
						@click="basculerPanneau()"
					/>
				</div>
			</div>

			<keep-alive>
				<component
					:is="ongletActif"
					:style="{ height: panneauAffiché ? '20rem' : '0' }"
					class="section-bas"
					:test="test_select"
					:resultat="resultat_select"
				/>
			</keep-alive>
		</div>
	</div>
</template>

<script src="./onglets_information.js"></script>

<style scoped src="./onglets_information.css"></style>
