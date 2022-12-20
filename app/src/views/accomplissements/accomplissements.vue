<template>
	<h1><span class="fas fa-trophy trophée"></span>  {{ $t("accomplissements.titrePage") }} {{ username }}<span class="fas fa-trophy trophée"></span></h1>
	<v-container>
		<v-row>
			<v-col cols="8">
				<tableauExercices class="accomplissementItem"/>
			</v-col>
			<v-col cols="4">
				<graphiqueStatistiques class="accomplissementItem" />
				<graphiqueStatistiquesParDifficulté  class="accomplissementItem" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script src="./accomplissements.js"></script>
<style src="./accomplissements.css"></style>
