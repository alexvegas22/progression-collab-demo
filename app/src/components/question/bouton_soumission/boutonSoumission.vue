<template>
	<div style="width: 100%; display: flex; flex-flow: column; align-items: center">
		<div
			class="btn-valider" style="display: flex; flex-flow: row; align-items: center"
		>
			<div
				id="btn_soumettre_tentative"
				type="button"
				class="btn btn-valider-play"
				présentation_étape="1.2"
				v-shortkey="raccourcis.soumettreTentative"
				@shortkey="validerTentative"
				@click="validerTentative"
			>
				{{$t('validation_tentative.soumettre')}}
				<v-icon
					v-if="envoiEnCours"
					style="color: gray; width: 1rem"
					icon="mdi-cog mdi-spin"
				/>
				<v-icon
					v-else
					style="color: white; width: 1rem"
					icon="mdi-play"
				/>
			</div>
		</div>
		<Tippy v-show="erreurCallback"
			trigger='click'
			interactive
			:aria="true"
			:show-on-create="false"
			:arrow="true"
			placement="bottom"
			class=" btn-valider-avertissement"
			:title="$t('retroaction_tentative.erreurCallback')"
		>
			<v-icon icon="mdi-alert" style="color:orange" />
			<template #content>
				<div class="message_erreur">
					{{erreurCallback}}
				</div>
			</template>
		</Tippy>
	</div>
</template>

<script src="./boutonSoumission.js"></script>
<style src="./boutonSoumission.css"></style>
