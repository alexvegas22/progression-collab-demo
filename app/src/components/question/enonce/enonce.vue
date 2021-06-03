<template>
	<div class="jumbotron encadré">
		<div class="container">
				<span class = "état" :class="{réussi: état_réussi}">
					✔
				</span>
			<div class="row">
				<h3 class="titre align-self-start">
					{{ question.titre }}
				</h3>
			</div>
			
			<div class="row">
				<p
					class="lead"
					v-html="question.énoncé">
				</p>
			</div>
		</div>
	</div>
</template>

<script src="./enonce.js"></script>

<style src="./enonce.css"></style>
