<template>
	<div class="jumbotron encadré">
		<div class="container">
			<div v-if = "état_réussi" class="crochet icon icon--order-success svg">
				<svg xmlns="http://www.w3.org/2000/svg">
					<g>
						<circle cx="35" cy="40" r="25"  style="fill: #8EC343; stroke: #8EC343"></circle>
						<path d="M21.417,40.778l9.93,9.909l20.444-20.393" style="stroke-dasharray:50px, 50px; stroke-dashoffset: 0px; stroke-width: 6; stroke: white; fill: none"></path>
					</g>
				</svg>
			</div>

			<div class="row" présentation_étape="0.1">
				<h3 class="titre align-self-start">
					{{ question.titre }}
					<span class="badge niveau"  présentation_étape="0.2"> {{ question.niveau }} </span>
				</h3>
			</div>
			
			<div class="row flex-grow-1" >
				<p  présentation_étape="0.3"
										class="lead texte_énoncé"
					v-html="question.énoncé">
				</p>
			</div>
			
			<div >
				<p class="footer-copyright text-center py-3">
					{{question.auteur}} {{question.licence}}
				</p>
			</div>
		</div>
	</div>
</template>

<script src="./enonce.js"></script>

<style src="./enonce.css"></style>
