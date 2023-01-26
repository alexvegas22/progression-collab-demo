<template>
	<div>
		<h1><v-icon icon="mdi-trophy"/>{{ $t("accomplissements.titrePage") }} {{ username }}<v-icon icon="mdi-trophy"/> </h1>
		<v-row>
			<v-col cols="8">
				<tableauExercices class="accomplissementItem"/>
			</v-col>
			<v-col cols="4">
				<graphiqueStatistiques class="accomplissementItem" />
				<graphiqueStatistiquesParDifficulté  class="accomplissementItem" />
			</v-col>
		</v-row>
	</div>
</template>

<script src="./accomplissements.js"></script>
<style src="./accomplissements.css"></style>
