<template>
	<div class="jumbotron rounded-0 bg-info">
		<h3 class="titre text-light">
			{{ titre }}
		</h3>

		<div class="row">
			<div
				class="enonce col-xs-12 col-sm-6 col-md-6 mx-auto bg-light text-info border border-dark"
				style="font-weight: bold"
			>
				{{ enonce }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Enonce",
	props: ["titre", "enonce"],
};
</script>

<style>
.text-question {
	font-weight: bold;
}
.enonce {
	font-style: italic;
	font-size: 1.7em;
}

.titre {
	font-size: 3em;
	text-align: center;
	color: white;
	font-weight: bold;
}
</style>
