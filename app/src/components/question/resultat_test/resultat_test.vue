<template>
	<div class="row g-0">
		<div class="col-12 h-100">
			<div
				v-if="test && !test.caché"
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
								<div>
									<textarea
										style="overflow: hidden"
										id="contenu_entrée"
										class="card-text p-3 inputTest"
										@input="entréesModifiées"
										v-model="this.test.entrée"
									></textarea>
								</div>
							</FenêtreInfo>
							<FenêtreInfo v-if="test.params!==null && test.params!==''">
								<template #titre>
									{{ $t('resultat_test.params') }}
								</template>
								<div>
									<textarea
										id="contenu_params"
										class="card-text p-3 inputTest"
										@input="entréesModifiées"
										v-model="this.test.params"
									></textarea>
								</div>
							</FenêtreInfo>
						</div>
					</template>
					<template #droite>
						<div
							class="d-flex"
							style="flex-flow: row; flex: 1 1 0; flex-grow: 1; "
						>
							<div
								v-if="!test.dirty"
								class="titre-sorties">
								{{ $t('resultat_test.sortieAttendue') }}
							</div>
							<div class="titre-sorties"
								v-if="résultat"
							>
								{{ $t('resultat_test.sortieConsole') }}
								<sélecteur-mode-affichage
									v-show="sortie_attendue"
									class="espace-sélecteur"
								/>
							</div>
						</div>
						<FenêtreInfo
							style="max-height: 100%"
						>
							<div
								class="d-flex"
								style="flex-flow: row; flex: 1 1 0; flex-grow: 1; "
							>
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
									présentation_étape="3.3"
									class="corps-sorties" >
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
								</div>
							</div>
						</FenêtreInfo>
					</template>
				</Diptyque>
			</div>
			<div v-else>
				<pre>
					<p class="card-text sortie vide p-3">{{ $t("resultat_test.caché") }}</p>
				</pre>
			</div>
		</div>
	</div>
</template>

<script src="./resultat_test.js"></script>
<style src="./resultat_test.css"></style>
