<template>
	<div>
		<div v-if="user">
			<Présentation v-if="démo" présentation_étape="00" />
		</div>
		<div class="container-fluid taille-écran p-0" :class="{ thème_sombre: thèmeSombre }">
		    <div class="conteneur-question" v-if="avancement">
				<Enonce
					:class="{ 'énoncé-plein': énoncéPleinÉcran, 'énoncé-semi': énoncéSemiÉcran, 'énoncé-caché': !énoncéPleinÉcran && !énoncéSemiÉcran }"
					:énoncéPleinÉcran="énoncéPleinÉcran"
					:énoncéSemiÉcran="énoncéSemiÉcran"
					@ajustéPanneauÉnoncé="ajusterPanneauÉnoncé"
					présentation_étape="0"
				/>
				<div class="flex-column fill-height h-100 p-0" v-show="!énoncéPleinÉcran" style="padding-left: 0">
					<div
						class="col-12 flex-column fill-height m-n-0"
						style="flex: 1 1 auto; position: relative"
						id="carre-editeur"
					>
						<Avancement 
							présentation_étape="2" 
							style="flex: 0 0 auto"
							:pleinÉcran="éditeurPleinÉcran"
							@basculéPanneauÉditeur="basculerPanneauÉditeur"
						/>
						<div class="flex-column overflow-hidden" style="flex: 1 1 auto" v-if="tentative">
							<EditeurCode présentation_étape="1" class="flex-grow-1 m-n-0" />
							<RetroactionTentative présentation_étape="3" />
						</div>
					</div>
					<div class="col-12">
						<onglets-information
							:panneauAffiché="panneauTestsAffiché"
							@basculéPanneauTests="basculerPanneauTests"
							présentation_étape="4"
						></onglets-information>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./question.js"></script>
<style src="./question.css"></style>

