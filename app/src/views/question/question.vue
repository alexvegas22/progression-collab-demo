<template>
	<div>
		<div v-if="user">
			<Présentation
				v-if="démo"
				présentation_étape="00"
			/>
		</div>
		<div
			v-shortkey="raccourcis.réinitialiser"
			class="container-fluid taille-écran p-0"
			:class="{ thème_sombre: thèmeSombre }"
			@shortkey="réinitialiserTentativeAvecRaccourci"
		>
			<div
				v-if="avancement"
				class="conteneur-question"
			>
				<Enonce
					v-shortkey="raccourcis.basculerÉnoncé"
					:class="{ 'énoncé-plein': énoncéPleinÉcran, 'énoncé-semi': énoncéSemiÉcran, 'énoncé-caché': !énoncéPleinÉcran && !énoncéSemiÉcran }"
					:énoncéPleinÉcran="énoncéPleinÉcran"
					:énoncéSemiÉcran="énoncéSemiÉcran"
					présentation_étape="0"
					@shortkey="basculerFormatÉnoncéAvecRaccourci"
					@ajustéPanneauÉnoncé="ajusterPanneauÉnoncé"
				/>
				<div
					v-show="!énoncéPleinÉcran"
					class="flex-column fill-height h-100 p-0"
					style="padding-left: 0"
				>
					<div 
						id="carre-editeur"
						v-shortkey="raccourcis.basculerÉditeur"
						class="col-12 flex-column fill-height m-n-0 ligne-séparation-avec-énoncé"
						style="flex: 1 1 auto; position: relative"
						@shortkey="basculerPanneauÉditeur"
					>
						<Avancement 
							présentation_étape="2" 
							style="flex: 0 0 auto"
							:pleinÉcran="éditeurPleinÉcran"
							:tentative-réinitialisée="tentativeRéinitialisée"
							@basculéPanneauÉditeur="basculerPanneauÉditeur"
						/>
						<div
							v-if="tentative"
							class="flex-column overflow-hidden"
							style="flex: 1 1 auto"
						>
							<EditeurCode
								présentation_étape="1"
								class="flex-grow-1 m-n-0"
							/>
							<RetroactionTentative />
						</div>
					</div>
					<div
						v-shortkey="raccourcis.basculerTests"
						class="col-12"
						@shortkey="basculerPanneauTests"
					>
						<onglets-information
							:panneau-affiché="panneauTestsAffiché"
							présentation_étape="4"
							:onglet-changé="ongletChangéRaccourci"
							:test-sélectionné-haut="testSélectionnéHaut"
							:test-sélectionné-bas="testSélectionnéBas"
							@basculéPanneauTests="basculerPanneauTests"
						/>
						<div
							v-shortkey="raccourcis.itérerOnglets"
							@shortkey="changerOngletAvecRaccourci"
						/>
						<div
							v-shortkey="raccourcis.basculerModeParDifférences"
							@shortkey="changerModeAffichageAvecRaccourci"
						/>
						<div
							v-shortkey="raccourcis.itérerTestHaut"
							@shortkey="sélectionnerTestDuHautAvecRaccourci"
						/>
						<div
							v-shortkey="raccourcis.itérerTestBas"
							@shortkey="sélectionnerTestDuBasAvecRaccourci"
						/>
					</div>
				</div>
				<div
					v-if="tentative.commentaires && indicateursDeFonctionnalitéCommentaires"
					class="btnCommentaire"
				>
					<BoutonCommentaire
						:menuOuvert="panneauCommentaireOuvert"
						@basculerMenuCommentaire="basculerMenuCommentaire"
					/>
				</div>
			</div>
		</div>
		<PanneauCommentaire
			:menuCommentaireOuvert="panneauCommentaireOuvert"
			@basculerMenuCommentaire="basculerMenuCommentaire"
		/>
	</div>
</template>

<script src="./question.js"></script>
<style src="./question.css"></style>
<style src="../../css/mainMenu.css"></style>
