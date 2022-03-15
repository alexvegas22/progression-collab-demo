<template>
	<div class="row g-0">
		<div class="col-3">
			<div class="bordure-titre p-1" :class="{ thème_sombre: thèmeSombre }">
				{{ $t("jeu_tests.jeuTests") }}
			</div>
			<fenetre-info :style="{ height: panneauAfficher ? '350px' : '0' }" class="section-bas">
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
		<div class="col-9">
			<div class="section-onglets">
				<div
					@click="changementOnglet('resultat-test')"
					:class="{ onglets: true, sélectionné: ongletActif === 'resultat-test', thème_sombre: thèmeSombre }"
				>
					{{ $t("onglets_informations.entrées/sorties") }}
				</div>

				<div
					@click="changementOnglet('section-erreur')"
					:class="{ onglets: true, sélectionné: ongletActif === 'section-erreur', thème_sombre: thèmeSombre }"
					v-if="resultat_select && resultat_select.sortie_erreur"
				>
					{{ $t("onglets_informations.erreurs") }}
				</div>

				<div
					@click="changementOnglet('commentaires')"
					:class="{ onglets: true, sélectionné: ongletActif === 'commentaires', thème_sombre: thèmeSombre }"
					v-if="resultat_select && resultat_select.feedback"
				>
					{{ $t("onglets_informations.commentaires") }}
				</div>
				<div style="margin-left: auto">
					<i
						style="height: 100%"
						@click="$emit('ajusterPanneau')"
						class="fa fa btn-affichage"
						:class="{ 'fa-window-minimize': panneauAfficher, 'fa-window-maximize': !panneauAfficher }"
					></i>
				</div>
			</div>

			<keep-alive>
				<component
					:is="ongletActif"
					:style="{ height: panneauAfficher ? '350px' : '0' }"
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