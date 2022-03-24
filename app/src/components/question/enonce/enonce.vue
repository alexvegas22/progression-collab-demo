<template>
	<div class="barre-énoncé">
		<perfect-scrollbar
			class="section-énoncé-texte"
			:class="{
				'énoncé-caché': !énoncéSemiÉcran && !énoncéPleinÉcran,
				'énoncé-padding': énoncéSemiÉcran || énoncéPleinÉcran,
			}"
		>
			<div v-if="état_réussi" class="crochet icon icon--order-success svg">
				<svg xmlns="http://www.w3.org/2000/svg" width="82px" height="82px">
					<g>
						<circle cx="35" cy="40" r="25" style="fill: #8ec343; stroke: #8ec343"></circle>
						<path
							d="M21.417,40.778l9.93,9.909l20.444-20.393"
							style="
							   stroke-dasharray: 50px, 50px;
							   stroke-dashoffset: 0px;
							   stroke-width: 6;
							   stroke: white;
							   fill: none;
							   "
						></path>
					</g>
				</svg>
			</div>

			<div class="row" présentation_étape="0.1">
				<div class="énoncéPlacement" v-bind:class="{'PasDeDifficulté':question.niveau==null}">	
					<h3 class="titre align-self-start">	{{ question.titre }} </h3>	
				</div>		
				<span id="niveauQuestion" class="badge niveau"  présentation_étape="0.2">
					{{ question.niveau }}
				</span>	
			</div>	


			<div class="row flex-grow-1" >
				<p  présentation_étape="0.3"
										class="enonce"
										v-html="question.énoncé">
				</p>
			</div>
			<div class="d-flex" :title="$t('énoncé.auteur')" v-if="question.auteur">
				<i
					class="icone fas fa-user-friends"/>
				<p class="footer-auteur">
					{{question.auteur}}
				</p>
			</div>
			
			<div class="d-flex" :title="$t('énoncé.licence')" v-if="question.licence">
				<i class="icone fas fa-copyright"/>
				<p class="footer-license">
					{{question.licence}}
				</p>
			</div>
		</perfect-scrollbar>
		<div class="section-bouton-affichage">
			
			<i
				@click="$emit('ajustéPanneauÉnoncé', 'max')"
				class="fa fa-window-maximize btn-affichage"
				aria-hidden="true"
				v-if="énoncéSemiÉcran"
			></i>
			<i
				@click="$emit('ajustéPanneauÉnoncé', 'normal')"
				class="fa fa-window-restore btn-affichage"
				aria-hidden="true"
				v-if="(!énoncéSemiÉcran && !énoncéPleinÉcran) || énoncéPleinÉcran"
			></i>
			<i
				@click="$emit('ajustéPanneauÉnoncé', 'min')"
				class="fa fa-window-minimize btn-affichage"
				aria-hidden="true"
				v-if="énoncéSemiÉcran || énoncéPleinÉcran"
			></i>
		</div>
	</div>
</template>

<script src="./enonce.js"></script>

<style src="./enonce.css"></style>
