<template>
	<div class="barre-énoncé">
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
		<div class="encadré-titre">
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
			<div class="description" v-if="question.objectif">
				{{$t("énoncé.objectif")}} {{ question.objectif }}
			</div>
			<div class="description" v-if="!question.objectif && question.description">
				{{ question.description }}
			</div>
		</div>
		<div class="section-énoncé-texte">
			<v-tabs v-model="tab"
				v-if="question.énoncé.length>1"
				présentation_étape="0.3"
				density="compact">

				<v-tab v-for="page in question.énoncé" :key="page.titre" :value="page.titre"
					size="small"
				>
					{{page.titre}}
				</v-tab>
			</v-tabs>

			<v-window v-model="tab"
				style="overflow: auto; height: 100%">
				<v-window-item
					v-for="page in question.énoncé"
					:key="page.titre"
					:value="page.titre">
					<v-card flat>
						<!-- eslint-disable-->
						<v-card-text v-html="page.texte"></v-card-text>
						<!-- eslint-enable-->
					</v-card>
				</v-window-item>
			</v-window>
		</div>
		<div
			v-if="question.auteur"
			class="d-flex"
			:title="$t('énoncé.auteur')"
		>
			<v-icon icon="mdi-account-multiple" class="icone" />
			<p class="footer-auteur">
				{{ question.auteur }}
			</p>
		</div>
		<div
			v-if="question.licence"
			class="d-flex"
			:title="$t('énoncé.licence')"
		>
			<v-icon icon="mdi-copyright" class="icone" />
			<p class="footer-license">
				{{ question.licence }}
			</p>
		</div>
	</div>
</template>

<script src="./enonce.js"></script>
<style src="./enonce.css"></style>

