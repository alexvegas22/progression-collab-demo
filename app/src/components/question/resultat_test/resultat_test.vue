<template>
	<div class="row g-0">
		<div class="col-12 h-100">
			<div
				v-if="test"
				class="h-100 d-flex"
				style="flex-flow: column"
			>
				<div
					class="d-flex"
					style="flex-flow: row; flex: 1 1 0; height: 50%"
				>
					<FenêtreInfo présentation_étape="3.1">
						<template #titre>
							{{ $t('resultat_test.entrée') }}
						</template>
						<pre class="card-text p-3" v-html="test.entrée"></pre>
					</fenetre-info>
					<fenetre-info v-if="test.params">
						<template v-slot:titre>
							{{ $t('resultat_test.params') }}
						</template>
						<pre
							class="card-text"
						>{{ test.params }}</pre>
					</FenêtreInfo>
				</div>
				<div class="d-flex" style="flex-flow: row; flex: 1 1 0; height: 50%">
					<fenetre-info présentation_étape="3.2">
						<template v-slot:titre>
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
					</fenetre-info>
					<fenetre-info présentation_étape="3.3" v-if="resultat">
						<template v-slot:titre>
							{{ $t('resultat_test.sortieConsole') }}
							<div class="float-end">
								<sélecteur-mode-affichage />
							</div>
						</template>
						<!-- eslint-disable -->
						<pre
							v-if="sortie_observée"
								  class="card-text p-3"
								  v-html="sortie_observée"
						/>
						<!-- eslint-enable -->
						<pre v-else>
                			<p class="card-text sortie vide p-3">{{$t("resultat_test.vide")}}</p>
              			</pre>
					</fenetre-info>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./resultat_test.js"></script>
<style src="./resultat_test.css"></style>
