<template>
	<div class="row g-0">
		<div class="col-xl-3 col-lg-4 col-4">
			<div class="section-tests">
				<div
					class="bordure-titre p-1 texte"
					:class="{ thème_sombre: thèmeSombre }"
				>
					{{ $t("jeu_tests.jeuTests") }}
				</div>
				<FenêtreInfo
					class="panneau"
					:class="{'panneau-affiché': panneauAffiché}"
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
						/>
					</div>
				</FenêtreInfo>
			</div>
		</div>
		<div class="col-xl-9 col-lg-8 col-8 texte">
			<div class="section-onglets">
				<div
					:class="{ onglets: true, 'onglet-sélectionné': ongletActif === 'ResultatTest', thème_sombre: thèmeSombre }"
					@click="changementOnglet('ResultatTest')"
				>
					{{ $t("onglets_informations.entrées/sorties") }}
					
					<i 
						v-if="tentative"
						class="fas fa-play btn-test-local" 
						:disabled="envoiEnCours"
						@click="validerTest"
					></i>
				</div>
				<div
					v-if="resultat_select && resultat_select.sortie_erreur"
					:class="{ onglets: true, 'onglet-sélectionné': ongletActif === 'SectionErreur', thème_sombre: thèmeSombre }"
					class="onglets-subséquents"
					@click="changementOnglet('SectionErreur')"
				>
					{{ $t("onglets_informations.erreurs") }}
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
					:style="{ height: panneauAffiché ? '18rem' : '0' }"
					class="section-bas"
					:test="test_select"
					:resultat="resultat_select"
					:panneau-affiché="panneauAffiché"
				/>
			</keep-alive>
		</div>
	</div>
</template>

<script src="./onglets_information.js"></script>
<style scoped src="./onglets_information.css"></style>