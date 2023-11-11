<template>
	<div
		v-if="résultat"
		class="section-erreur"
	>
		<div class="full-flex column"
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
			<div class="full-flex row" >
				<pre>{{ résultat.sortie_erreur }}</pre>
			</div>
		</div>
	</div>
</template>

<script src="./section_erreurs.js"></script>
<style scoped src="./section_erreurs.css"></style>
