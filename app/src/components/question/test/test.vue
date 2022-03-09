<template>
	<div class="pb-1">
		<div>
			<div class="row w-100 m-0 p-1" v-on:click="toggleVisibilite">
				<div class="col-1 m-0 p-0" v-show="modifiable">
					<button type="button" v-on:click="btnSupprimer" class="btn p-0 m-0 text-center">✘</button>
				</div>
				<div
					class="col-10 test"
					:class="{ sélectionné, non_sélectionné: !sélectionné }"
					v-bind:class="{ réussi, non_réussi }"
				>
					<input ref="unTestInput" v-if="modifiable" class="w-100 m-0 border-0 enleverOutline" v-model="test.nom" />
					<p v-else class="p-0 m-0" v-html="index + 1 + '. ' + test.nom"></p>
				</div>
				<div class="col-1" style="visibility: hidden" :class="{ visible: sélectionné }">▶</div>
			</div>
		</div>
	</div>
</template>

<script src="./test.js"></script>
<style src="./test.css"></style>