<template>
	<h1 style="text-align: center">{{ $t("jeu_tests.jeuTests") }}</h1>
	<div v-if="resultats[0]" class="text-center">
		<label class="label">
			<div class="label-text" style="margin-right: 10px">{{ $t("jeu_tests.modeNormal") }}</div>
			<div class="toggle">
				<input
					class="toggle-state"
					type="checkbox"
					name="check"
					v-model="modeVisuel"
					v-on:input="modeVisuel = $event.target.value"
					@change="changerModeComparaison()"
				/>
				<div class="indicator"></div>
			</div>
			<div class="label-text">{{ $t("jeu_tests.modeVisuel") }}</div>
		</label>
	</div>
	<div v-for="(test, index) in tests" :key="index">
		<Test v-bind:test="test" v-bind:resultat="resultats[index]" />
	</div>
</template>

<script src="./jeu_tests.js"></script>

<style src="./jeu_tests.css"></style>
