<template>
	<div
		v-if="tempsÉxecution"
		class="section-détails"
	>
		<div
			id="section-détails"
			class="p-1"
		>
			<p>{{ $t("resultat_details.tempsTest") }} {{" "+résultat.temps_exec+" "}} {{ $t("resultat_details.unitéMesure") }}</p>
		</div>
	</div>
</template>

<script src="./section_details.js"></script>
<style src="./section_details.css"></style>
