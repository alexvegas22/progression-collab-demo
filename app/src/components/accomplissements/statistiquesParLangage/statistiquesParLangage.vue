<template>
	<div>
		<h1>{{ $t("accomplissements.titreGraphParLangage") }}  <span class="fa fa-pie-chart"></span></h1>
		<div>
			<pie-chart
				class="centrer max-width margin-top padding-bottom"
				width="29rem"
				height="17.4rem"
				legend="right"
				suffix="%"
				:library="{color: '#8c8c8c'}"
				:data="this.nbRéussitesParLangage"
			/>
		</div>
	</div>
</template>

<script src="./statistiquesParLangage.js"></script>
<style src="../statistiquesParDifficulté/statistiquesParDifficulté.css" scoped></style>