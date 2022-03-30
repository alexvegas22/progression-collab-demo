<template>
	<div class="section-erreur">
		<div class="p-1">
			<h5 class="text-danger font-weight-bold text-left card-title">
				{{ $t("resultat_test.sortieErreur") }}
			</h5>
			<pre>
				<p
				class="card-text"
>{{ resultat.sortie_erreur }}</p><p />
			</pre>
		</div>
	</div>
</template>

<script src="./section_erreurs.js"></script>
<style scoped src="./section_erreurs.css"></style>