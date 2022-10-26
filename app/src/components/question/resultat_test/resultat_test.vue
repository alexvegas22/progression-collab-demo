<template>
	<div class="row g-0">
		<div class="col-12 h-100">
			<div
				v-if="test"
				class="h-100 d-flex"
				style="flex-flow: column"
			>
			    <MesSplitpanes horizontal="true" class="default-theme">
					<template #gauche>
				<div
					class="d-flex"
					style="flex-flow: row; flex: 1 1 0; height: 100%"
				>
					<Ampoule
						v-if="résultat && !résultat.sortie_erreur && feedback"
						class="rétroaction-test"
						:feedback="feedback"
					/>
					<FenêtreInfo présentation_étape="3.1">
						<template #titre>
							{{ $t('resultat_test.entrée') }}
							<i 
								@click="réinitialiserEntréesUtilisateur"
								class="fa fa-refresh boutonRafraichissement"
							></i>
						</template>
						<textarea
							style="overflow: hidden"
							id="contenu_entrée"
							class="card-text p-3 inputTest"
							@input="entréePersonnalisée"
							v-model="this.test.entrée"
						></textarea>
					</FenêtreInfo>
					<FenêtreInfo v-if="test.params">
						<template #titre>
							{{ $t('resultat_test.params') }}
						</template>
						<textarea
							id="contenu_params"
							class="card-text p-3  inputTest"
							@input="paramsPersonnalisés"
							v-model="this.test.params"
						></textarea>
					</FenêtreInfo>
				</div>
					</template>
					<template #droite>
				<div
					class="d-flex"
					style="flex-flow: row; flex: 1 1 0; flex-grow: 1; height: 100%"
				>
					<FenêtreInfo
						présentation_étape="3.2"
											:class="{résultat: résultat-test}"
					>
						<template #titre>
							{{ $t('resultat_test.sortieAttendue') }}
						</template>
							<!-- eslint-disable -->
							<pre
							    v-if="sortie_attendue"
							    class="card-text p-3"
							    v-html="sortie_attendue"
							/>
							<!-- eslint-enable -->
							<pre v-else>
								<p class="card-text sortie vide p-3">{{ $t("resultat_test.vide") }}</p>
							</pre>
					</FenêtreInfo>
					<FenêtreInfo
						v-if="résultat"
							  présentation_étape="3.3"
							  class="résultat-test"
							  style="max-width:50%; height:100%" >
						<template #titre>
							<div class="espace-titre-sortie-observée">
								{{ $t('resultat_test.sortieConsole') }}
								<sélecteur-mode-affichage class="espace-sélecteur" />
							</div>
						</template>
						<!-- eslint-disable -->
						<pre
							v-if="sortie_observée"
							class="card-text p-3"
							v-html="sortie_observée"
							style="width:max-content; height:max-content; overflow: hidden"  
						/>
							<!-- eslint-enable -->
							<pre v-else>
								<p class="card-text sortie vide p-3">{{ $t("resultat_test.vide") }}</p>
							</pre>
					</FenêtreInfo>
				</div>
					</template>
				</MesSplitpanes>
			</div>
		</div>
	</div>
</template>

<script src="./resultat_test.js"></script>
<style src="./resultat_test.css"></style>
