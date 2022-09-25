<template>
	<div class="pb-1">
		<div>
			<div
				class="row w-100 m-0 p-0"
				@click="toggleVisibilite"
			>
				<div
					class="test m-1 p-1"
					:class="{sélectionné, non_sélectionné: !sélectionné, réussi, non_réussi}"
				>
					{{ (index+1) + '. ' + test.nom }}
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./test.js"></script>
<style src="./test.css"></style>
