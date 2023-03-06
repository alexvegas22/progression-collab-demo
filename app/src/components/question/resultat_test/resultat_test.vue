<template>
	<div class="row g-0">
		<div class="col-12 h-100">
			<div
				v-if="test"
				class="h-100 d-flex"
				style="flex-flow: column"
			>
				<Diptyque horizontal="true">
					<template #gauche>
						<div
							class="d-flex"
							style="flex-flow: row; flex: 1 1 0; height: 100%"
						>
							<Ampoule
								v-if="feedback"
								:estVisible="résultat && !résultat.sortie_erreur && feedback!==null"
								class="rétroaction-test"
								:feedback="feedback"
							/>
							<FenêtreInfo présentation_étape="3.1">
								<template #titre>
									{{ $t('resultat_test.entrée') }}
								</template>
								<textarea
									style="overflow: hidden"
									id="contenu_entrée"
									class="card-text p-3 inputTest"
									@input="entréesModifiées"
									v-model="this.test.entrée"
								></textarea>
							</FenêtreInfo>
							<FenêtreInfo v-if="test.params">
								<template #titre>
									{{ $t('resultat_test.params') }}
								</template>
								<textarea
									id="contenu_params"
									class="card-text p-3 inputTest"
									@input="entréesModifiées"
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
								v-if="!test.dirty"
								présentation_étape="3.2"
								:class="{'résultat-test': résultat}"
							>
								<template #titre>
									{{ $t('resultat_test.sortieAttendue') }}
								</template>
								<!-- eslint-disable -->
								<div v-if="!test.sortie_cachée">
									<pre v-if="sortie_attendue"
										 class="card-text p-3"
										 v-html="sortie_attendue"
									/>
									<pre v-else>
										<p class="card-text sortie vide p-3">{{ $t("resultat_test.vide") }}</p>
									</pre>
								</div>
								<!-- eslint-enable -->
								<div v-else>
									<pre>
										<p class="card-text sortie vide p-3">{{ $t("resultat_test.cachée") }}</p>
									</pre>
								</div>
							</FenêtreInfo>
							<FenêtreInfo
								v-if="résultat"
								présentation_étape="3.3"
								style="width:50%; height:100%" >
								<template #titre>
									<div class="espace-titre-sortie-observée">
										{{ $t('resultat_test.sortieConsole') }}
										<sélecteur-mode-affichage
											v-show="!test.sortie_cachée && sortie_attendue"
											class="espace-sélecteur" />
									</div>
								</template>
								<!-- eslint-disable -->
								<div v-if="sortie_observée">
									<pre
										class="card-text p-3"
											   v-html="sortie_observée"
									/>
								</div>
								<!-- eslint-enable -->
								<div v-else>
									<pre>
										<p class="card-text sortie vide p-3">{{ $t("resultat_test.vide") }}</p>
									</pre>
								</div>
							</FenêtreInfo>
						</div>
					</template>
				</Diptyque>
			</div>
		</div>
	</div>
</template>

<script src="./resultat_test.js"></script>
<style src="./resultat_test.css"></style>
