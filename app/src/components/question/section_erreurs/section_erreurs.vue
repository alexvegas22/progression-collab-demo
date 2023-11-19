<template>
	<div
		v-if="résultat"
		class="section-erreur contenu"
	>
		<div class="full-flex ffcolumn"
			id="section-erreur"
		>
			<h5 class="text-danger font-weight-bold text-left card-title">
				{{ $t("resultat_test.sortieErreur") }}
			</h5>
			
			<Ampoule 
				v-if="résultat.sortie_erreur && résultat.feedback"
				class="rétroaction-test"
				:feedback="résultat.feedback"
				:estVisible="panneauAffiché"
			/>
			<div class="full-flex ffrow" >
				<pre
					class="contenu card-text p-3">
					<p class="sortie vide">{{ résultat.sortie_erreur }}</p>
				</pre>
			</div>
		</div>
	</div>
</template>

<script src="./section_erreurs.js"></script>
<style scoped src="./section_erreurs.css"></style>
