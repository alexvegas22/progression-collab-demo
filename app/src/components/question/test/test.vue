<template>
	<div class="pb-1">
		<div>
			<div
				class="row w-100 m-0 p-0"
				@click="toggleVisibilite"
			>
				<div
					class="test p-1"
					:class="{
						sélectionné,
						non_sélectionné: !sélectionné,
						réussi,
						non_réussi
					}"
				>
					<div style="display: flex; flex-flow: row">
						<span :class="{symbole_réussi: réussi, symbole_non_réussi: non_réussi}"></span>
						<div style="flex-grow: 1">{{ (index+1) + '. ' + test.nom }}</div>
						<slot name="lancement"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./test.js"></script>
<style src="./test.css"></style>
