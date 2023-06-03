<template>
	<v-banner
		icon="mdi-alert"
		color="error"
		style="position: absolute; top: 0px; margin: 10px; z-index:9999; border: 1px solid; border-radius: 15px;"
		v-show="erreurs.length"
	>
		<v-card  v-for="erreur in erreurs" :key="erreur" >
			<v-banner-text>
				<!-- eslint-disable -->
			<div v-if="erreur && erreur.message" v-html="erreur.message"/>
			<!-- eslint-enable -->
				<div v-if="erreur && erreur.détails">
					{{ $t("erreur.réseau") }}
					<details>
						<summary>
							{{$t("erreur.détails")}}
						</summary>
						{{ erreur.détails }}
					</details>
				</div>
			</v-banner-text>
		</v-card>
		<template v-slot:actions>
			<v-btn
				@click="effacerErreurs()"
			>OK</v-btn>
		</template>
	</v-banner>
</template>

<script src="./bannière_erreur.js"/>
