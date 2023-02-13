<template>
	<v-banner
		icon="mdi-alert"
		color="error"
		style="position: absolute; top: 0px; margin: 10px; z-index:9999; border: 1px solid; border-radius: 15px;"
		v-show="erreurs"
	>
		<v-banner-text>
			<div v-if="erreurs && erreurs.message">
				{{ erreurs.message }}
			</div>
			<div v-if="erreurs && erreurs.détails">
				{{ $t("erreur.réseau") }}
				<details>
					<summary>
						{{$t("erreur.détails")}}
					</summary>
					{{ erreurs.détails }}
				</details>
			</div>
		</v-banner-text>

		<template v-slot:actions>
			<v-btn
				@click="effacerErreurs()"
			>OK</v-btn>
		</template>
	</v-banner>
</template>

<script src="./bannière_erreur.js"/>
