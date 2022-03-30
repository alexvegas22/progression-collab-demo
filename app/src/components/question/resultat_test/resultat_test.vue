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
						<pre
							class="card-text p-3"
						>{{ test.entrée }}</pre>
					</FenêtreInfo>

					<FenêtreInfo v-if="test.params">
						<template #titre>
							{{ $t('resultat_test.params') }}
						</template>
						<pre
							class="card-text"
						>{{ test.params }}</pre>
					</FenêtreInfo>
				</div>

				<div
					class="d-flex"
					style="flex-flow: row; flex: 1 1 0; height: 50%"
				>
					<FenêtreInfo présentation_étape="3.2">
						<template #titre>
							{{ $t('resultat_test.sortieAttendue') }}
						</template>
						<pre v-if="sortie_attendue" class="card-text p-3" v-html="sortie_attendue"/>
						<pre v-else>
							<p class="card-text sortie vide p-3">{{ $t("resultat_test.vide") }}</p>
						</pre>

					</FenêtreInfo>

					<FenêtreInfo
						v-if="resultat"
						présentation_étape="3.3"
					>
						<template #titre>
							{{ $t('resultat_test.sortieConsole') }}

							<div class="float-end">
								<sélecteur-mode-affichage />
							</div>
						</template>
						<pre v-if="sortie_observée" class="card-text p-3" v-html="sortie_observée"/>
						<pre v-else>
							<p class="card-text sortie vide p-3">{{ $t("resultat_test.vide") }}</p>
						</pre>
					</FenêtreInfo>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./resultat_test.js"></script>

<style src="./resultat_test.css"></style>
