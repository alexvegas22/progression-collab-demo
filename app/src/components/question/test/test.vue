<template>
	<div class="pb-1">
		<div>
			<div class="row w-100 m-0 p-1" :class="{sélectionné, non_sélectionné: !sélectionné}" v-bind:class="{réussi, non_réussi}"  v-on:click="toggleVisibilite">
				<div>
					<p class="p-0 m-0" v-html="(index+1) + '. ' + test.nom"></p>
				</div>
				<div style="clear: both"></div>
				<div class="col-md align-right"></div>
			</div>
		</div>
	</div>
</template>

<script src="./test.js"></script>
<style src="./test.css"></style>
