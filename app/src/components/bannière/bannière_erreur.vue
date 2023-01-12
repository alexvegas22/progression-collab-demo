<template>
	<v-banner
		icon="fas fa-exclamation-triangle"
		color="error"
		style="position: absolute; z-index:999; border-radius: 15px; background: #FFFFFFE0"
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
