<template>
	<div class="pb-1">
		<div>
			<div class="p-1 row w-100 m-0 g-0" v-on:click="toggleVisibilite">
				<div style="width:95%;" class="test" :class="{sélectionné, non_sélectionné: !sélectionné}" v-bind:class="{réussi, non_réussi}" >
					<p class="p-1 m-0" v-html="(index+1) + '. ' + test.nom"></p>
				</div>				
				<div style="visibility:hidden; width:5%;" class="d-flex align-items-center" :class="{visible: sélectionné}">
				▶
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./test.js"></script>
<style src="./test.css"></style>
