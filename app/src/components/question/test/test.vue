<template>
	<div class="pb-1">
		<div>
			<div
				class="row w-100 m-0 p-1"
				@click="toggleVisibilite"
			>
				<div
					class="col-11 test"
					:class="{sélectionné, non_sélectionné: !sélectionné, réussi, non_réussi}"
				>
					<p class="p-0 m-0">
						{{ (index+1) + '. ' + test.nom }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./test.js"></script>
<style src="./test.css"></style>
