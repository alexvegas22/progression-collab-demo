<template>
	<v-container>
		<h1>{{ $t("accomplissements.titreGraphParLangage") }}  <v-icon icon="mdi-chart-pie"/></h1>
		<div>
			<pie-chart
				class="centrer max-width margin-top padding-bottom"
				legend="right"
				suffix="%"
				:library="{color: '#8c8c8c'}"
				:data="this.nbRéussitesParLangage"
			/>
		</div>
	</v-container>
</template>

<script src="./statistiquesParLangage.js"></script>
<style src="../statistiquesParDifficulté/statistiquesParDifficulté.css" scoped></style>
