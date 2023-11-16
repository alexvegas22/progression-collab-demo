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
					class="full-flex"
					style="	border: 1px solid rgba(128, 128, 128, 0.25);"
					présentation_étape="3.1"
				>
					<v-textarea 
						:label="$t('resultat_test.entrée')"
						hide-details="true"
						variant="solo"
						rounded="0"
						id="contenu_entrée"
						@input="entréesModifiées"
						v-model="this.test.entrée"
					></v-textarea>
					<v-textarea
						v-if="test.params!==null && test.params!==''"
						:label="$t('resultat_test.params')"
						hide-details="true"
						variant="solo"
						rounded="0"
						flat
						id="contenu_params"
						@input="entréesModifiées"
						v-model="this.test.params"
					></v-textarea>
				</div>
			</template>
			<template #entête_droite>
				<div style="display: flex; flex-flow: row; width: 100%">
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
				<div class="full-flex column">
					<div style="overflow: auto; flex-grow: 1; max-height: 100%; display: flex; flex-direction: row; align-content: center">
						<div
							v-if="!test.dirty"
							class="corps-sorties"
							présentation_étape="3.2"
							:class="{'résultat-test': résultat}"
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
							<v-card v-else>
								<p class="card-text sortie vide p-3">{{ $t("resultat_test.vide") }}</p>
							</v-card>

						</div>
					</div>
				</div>
			</template>
		</Diptyque>
	</div>
	<div v-else>
		<pre>
			<p class="card-text sortie vide p-3">{{ $t("resultat_test.caché") }}</p>
		</pre>
	</div>
</template>

<script src="./resultat_test.js"></script>
<style src="./resultat_test.css"></style>
