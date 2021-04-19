<template>
	<div class="pb-5">
		<div v-on:click="toggleVisibilite">
			<div class="row w-100 m-0">
				<div class="col-md text-right" v-if="this.visible">
					<span style="font-size: 200%"> &#9660; </span>
				</div>
				<div class="col-md text-right" v-else>
					<span style="font-size: 200%"> &#10148; </span>
				</div>

				<div class="col-md-8">
					<div class="p-2 border">
						<div class="float-left">
							<p class="p-0 m-0" v-html="test.nom"></p>
						</div>
						<div style="clear: both"></div>
					</div>
				</div>

				<div class="col-md align-right"></div>
			</div>
			<div class="col-md-12" v-if="this.visible">
				<ResultatTest v-bind:test="test" v-bind:resultat_p="resultat"/>
			</div>
		</div>
	</div>
</template>

<script src="./test.js"></script>
