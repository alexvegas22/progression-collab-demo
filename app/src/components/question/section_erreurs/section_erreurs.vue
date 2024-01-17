<template>
	<PanneauMinMax class="contenu">
		<template #entête>
			<p class="titre contenu">
				{{ $t("resultat_test.sortieErreur") }}
			</p>
		</template>

		<div
			v-if="résultat"
			class="section-erreur contenu"
		>
			<div class="full-flex ffcolumn"
				id="section-erreur"
			>
				<Ampoule 
					v-if="résultat.sortie_erreur && résultat.feedback"
					class="rétroaction-test"
					:feedback="résultat.feedback"
					:estVisible="panneauAffiché"
				/>
				<div class="full-flex ffrow" >
					<pre
						style="width: 100%;"
						class="card-text p-3">
						<p>{{ résultat.sortie_erreur }}</p>
					</pre>
				</div>
			</div>
		</div>
	</PanneauMinMax>
</template>

<script src="./section_erreurs.js"></script>
<style scoped src="./section_erreurs.css"></style>
