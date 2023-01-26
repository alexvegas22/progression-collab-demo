<template>
	<v-container>
		<h1>{{ $t("accomplissements.titreGraphParDifficulté") }} <span class="fa fa-pie-chart"></span></h1>
		<div>
			<pie-chart
				class="centrer max-width margin-top padding-bottom"
				legend="right"
				suffix="%"
				:library="{color: '#8c8c8c'}"
				:data="this.difficultésRéussies"
			/>
		</div>
	</v-container>
</template>

<script src="./statistiquesParDifficulté.js"></script>
<style src="./statistiquesParDifficulté.css" scoped></style>
