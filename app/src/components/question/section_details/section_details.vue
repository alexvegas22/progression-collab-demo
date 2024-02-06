<template>
	<div
		v-if="résultat?.temps_exécution"
		class="section-détails contenu"
	>
		<div
			id="section-détails"
			class="p-1"
		>
			<pre
				class="contenu card-text p-3">
				<p class="sortie vide">{{ $t("resultat_details.tempsTest") }} {{" "+résultat.temps_exécution+" "}} {{ $t("resultat_details.unitéMesure") }}</p>
			</pre>
		</div>
	</div>
</template>

<script src="./section_details.js"></script>
<style scoped src="./section_details.css"></style>
