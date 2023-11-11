<template>
	<div
		class="btn-valider"
	>
		<div
			id="btn_soumettre_tentative"
			type="button"

			:title="$t(question_type=='prog' ? 'validation_tentative.boutonSoumettre' : 'validation_tentative_boutonValider')"
				
			class="btn btn-valider-play"
			présentation_étape="1.2"
			v-shortkey="raccourcis.soumettreTentative"
			@shortkey="validerTentative"
			@click="validerTentative"
		>
			{{question_type == 'prog' ? $t('validation_tentative.soumettre') : $t('validation_tentative.valider') }}
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
</template>

<script src="./boutonSoumission.js"></script>
<style scoped src="./boutonSoumission.css"></style>
