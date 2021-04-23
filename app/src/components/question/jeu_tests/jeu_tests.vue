<template>
	<h1 style="text-align: center">{{ $t("jeu_tests.jeuTests") }}</h1>
	<div v-if="resultats[0]" class="text-center">
		<label class="label">
			<div class="label-text" style="margin-right: 10px">{{ $t("jeu_tests.modeNormal") }}</div>
			<div class="toggle">
				<input class="toggle-state" type="checkbox" name="check" v-model="modeVisuel" />
				<div class="indicator"></div>
			</div>
			<div class="label-text" style="margin-right:50px">{{ $t("jeu_tests.modeVisuel") }}</div>
		</label>

		<label class="label">
			<div class="label-text" style="margin-right: 10px">Diff off</div>
			<div class="toggle">
				<input class="toggle-state" type="checkbox" name="checkDiff" v-model="modeDiff" />
				<div class="indicator"></div>
			</div>
			<div class="label-text">Diff on</div>
		</label>
	</div>
	<div v-for="(test, index) in this.testsDiff" :key="index">
		<Test v-bind:test="test" v-bind:resultat="resultatsDiff[index]" />
	</div>
</template>

<script src="./jeu_tests.js"></script>

<style src="./jeu_tests.css"></style>
