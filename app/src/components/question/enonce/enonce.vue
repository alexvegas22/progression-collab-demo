<template>
	<div
		class="barre-énoncé"
	>
		<div class="section-bouton-affichage">
			<i
				v-if="énoncéSemiÉcran"
				class="fa fa-window-maximize btn-affichage"
				aria-hidden="true"
				@click="$emit('ajustéPanneauÉnoncé', 'max')"
			/>
			<i
				v-if="(!énoncéSemiÉcran && !énoncéPleinÉcran) || énoncéPleinÉcran"
				class="fa fa-window-restore btn-affichage"
				aria-hidden="true"
				@click="$emit('ajustéPanneauÉnoncé', 'normal')"
			/>
			<i
				v-if="énoncéSemiÉcran || énoncéPleinÉcran"
				class="fa fa-window-minimize btn-affichage"
				aria-hidden="true"
				@click="$emit('ajustéPanneauÉnoncé', 'min')"
			/>
		</div>

		<div v-show="énoncéSemiÉcran || énoncéPleinÉcran">
			<div
				class="entête row"
				présentation_étape="0.1"
			>
				<div
					class="énoncéPlacement"
					:class="{'PasDeDifficulté':question.niveau==null}"
				>
					<h3 class="titre align-self-start">
						{{ question.titre }}
					</h3>
				</div>
				<span
					id="niveauQuestion"
					class="badge niveau"
					présentation_étape="0.2"
				>
					{{ question.niveau }}
				</span>
			</div>

			<div
				v-if="état_réussi"
				class="crochet icon icon--order-success svg"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="82px"
					height="82px"
				>
					<g>
						<circle
							cx="35"
							cy="40"
							r="25"
							style="fill: #8ec343; stroke: #8ec343"
						/>
						<path
							d="M21.417,40.778l9.93,9.909l20.444-20.393"
							style="
			       stroke-dasharray: 50px, 50px;
			       stroke-dashoffset: 0px;
			       stroke-width: 6;
			       stroke: white;
			       fill: none;
			       "
						/>
					</g>
				</svg>
			</div>

			<perfect-scrollbar class="section-énoncé-texte">
				<div class="row flex-grow-1">
					<!-- eslint-disable -->
				<p présentation_étape="0.3" v-html="question.énoncé" />
				<!-- eslint-enable -->
				</div>

				<div
					v-if="question.auteur"
					class="d-flex"
					:title="$t('énoncé.auteur')"
				>
					<i class="icone fas fa-user-friends" />
					<p class="footer-auteur">
						{{ question.auteur }}
					</p>
				</div>

				<div
					v-if="question.licence"
					class="d-flex"
					:title="$t('énoncé.licence')"
				>
					<i class="icone fas fa-copyright" />
					<p class="footer-license">
						{{ question.licence }}
					</p>
				</div>
			</perfect-scrollbar>
		</div>
	</div>
</template>

<script src="./enonce.js"></script>

<style src="./enonce.css"></style>
