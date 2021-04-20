<template>
	<div class="jumbotron rounded-0 bg-info">
		<h3 class="titre text-light">
			{{ question.titre }}
		</h3>

		<div class="row">
			<div
				class="enonce col-xs-12 col-sm-6 col-md-6 mx-auto bg-light text-info border border-dark"
				v-html="question.énoncé"
			>
			</div>
		</div>
	</div>
</template>

<script src="./enonce.js"></script>

<style src="./enonce.css"></style>
