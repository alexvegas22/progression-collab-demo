<template>
	<div
		v-if="resultat"
		class="section-erreur"
	>
		<div
			id="section-erreur"
			class="p-1"
		>
			<h5 class="text-danger font-weight-bold text-left card-title">
				{{ $t("resultat_test.sortieErreur") }}
			</h5>
			
			<Ampoule 
				v-if="resultat.sortie_erreur && resultat.feedback"
				:feedback="resultat.feedback"
				:panneau-affiché="panneauAffiché"
				class="ampoule"
			/>
			
			<perfect-scrollbar class="margin-perfect-scrollbar">
				<pre>
					<p class="card-text">{{ resultat.sortie_erreur }}</p>
				</pre>
			</perfect-scrollbar>
		</div>
	</div>
</template>

<script src="./section_erreurs.js"></script>
<style scoped src="./section_erreurs.css"></style>
