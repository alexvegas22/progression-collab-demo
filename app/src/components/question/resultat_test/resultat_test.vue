<template>
	<div
		v-if="test && !test.caché"
	>
		<Ampoule
			v-if="feedback"
			:estVisible="résultat && !résultat.sortie_erreur && feedback!==null"
			class="rétroaction-test"
			:feedback="feedback"
		/>		
		<Diptyque horizontal="true" :gauche="question_type=='sys'?'caché':'fixe'" size_gauche="25" droite="true"
		>
			<template #gauche>
				<div
					class="full-flex ffrow bordure-grise"
					présentation_étape="3.1"
					style="padding: 5px;"
				>
					<v-textarea
						class="textarea"
						:label="$t('resultat_test.entrée')"
						hide-details="true"
						variant="plain"
						rounded="0"
						flat
						id="contenu_entrée"
						@input="entréesModifiées"
						v-model="this.test.entrée"
					></v-textarea>

					<v-textarea v-if="test.params!==null && test.params!==''"
						class="textarea"
						:label="$t('resultat_test.params')"
						hide-details="true"
						variant="plain"
						rounded="0"
						flat
						id="contenu_params"
						@input="entréesModifiées"
						v-model="this.test.params"
					></v-textarea>
				</div>
			</template>
			<template #entête_droite>
				<div style="display: flex; flex-flow: row; width: calc(100% + var(--largeur-boutons-entête) + 0.5rem )">
					<div
						v-if="!test.dirty"
						class="titre-sorties">
						{{ $t('resultat_test.sortieAttendue') }}
					</div>
					<div class="titre-sorties"
						v-if="résultat"
					>
						{{ $t('resultat_test.sortieConsole') }}

						<SélecteurModeAffichage
							@onModeChange="onModeChange"
							v-show="sortie_attendue"
							class="espace-sélecteur"
							:occupé="recalcul"
						/>
					</div>
				</div>
			</template>
			<template #droite>
				<div class="full-flex ffrow panneaux-sorties">
					<div
						v-if="!test.dirty"
						présentation_étape="3.2"
						:class="{'corps-sorties': true, 'résultat-test': résultat}"
					>
						<!-- eslint-disable -->
							<pre v-if="sortie_attendue"
								 class="card-text p-3"
								 v-html="sortie_attendue"
							/>
							<!-- eslint-enable -->
						<pre v-else>
								<p class="card-text sortie vide p-3">{{ $t("resultat_test.vide") }}</p>
							</pre>
					</div>
					<div
						v-if="résultat"
						class="corps-sorties"
						présentation_étape="3.3"
					>
						<!-- eslint-disable -->
						<pre v-if="sortie_observée"
							 class="card-text p-3"
							 v-html="sortie_observée"
						/>

								<!-- eslint-enable -->
						<pre v-else
							class="card-text p-3">
							<p class="card-text sortie vide p-3">{{ $t("resultat_test.vide") }}</p>
						</pre>

					</div>
				</div>
			</template>
		</Diptyque>
	</div>
	<div v-else>
		<pre
			class="contenu card-text p-3">
				<p class="sortie vide">{{ $t("resultat_test.caché") }}</p>
			</pre>
	</div>
</template>

<script src="./resultat_test.js"></script>
<style src="./resultat_test.css"></style>
