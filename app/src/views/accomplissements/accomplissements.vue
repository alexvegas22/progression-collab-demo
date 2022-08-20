<template>
	<div>
		<h1><span class="fas fa-trophy trophée"></span>  {{ $t("accomplissements.titrePage") }} {{ username }}<span class="fas fa-trophy trophée"></span></h1>
		<div class="accomplissementContainer row" style="max-height: 100%; max-width: 100%;">
			<div class="accomplissementItem col-lg-12 bordure_table">
				<tableauExercices />
			</div>
			<div class="accomplissementItem col-lg-6">
				<graphiqueStatistiques />
			</div>
			<div class="accomplissementItem col-lg-6" style="border-right: none;">
				<graphiqueStatistiquesParDifficulté />
			</div>
		</div>
	</div>
</template>

<script src="./accomplissements.js"></script>
<style src="./accomplissements.css"></style>
