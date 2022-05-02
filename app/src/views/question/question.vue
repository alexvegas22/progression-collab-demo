<template>
	<div 
		v-shortkey="['ctrl', 'alt', 'f']"
		@shortkey="basculerÉnoncéPleinÉcranAvecRaccourci"
	>
		<div v-if="user">
			<Présentation
				v-if="démo"
				présentation_étape="00"
			/>
		</div>
		<div
			v-shortkey="['ctrl', 'alt', 'r']"
			class="container-fluid taille-écran p-0"
			:class="{ thème_sombre: thèmeSombre }"
			@shortkey="réinitialiserTentativeAvecRaccourci"
		>
			<div
				v-if="avancement"
				class="conteneur-question"
			>
				<Enonce
					v-shortkey="['ctrl', 'alt', 'q']"
					:class="{ 'énoncé-plein': énoncéPleinÉcran, 'énoncé-semi': énoncéSemiÉcran, 'énoncé-caché': !énoncéPleinÉcran && !énoncéSemiÉcran }"
					:énoncéPleinÉcran="énoncéPleinÉcran"
					:énoncéSemiÉcran="énoncéSemiÉcran"
					présentation_étape="0"
					@shortkey="basculerÉnoncéSemiÉcranAvecRaccourci"
					@ajustéPanneauÉnoncé="ajusterPanneauÉnoncé"
				/>
				<div
					v-show="!énoncéPleinÉcran"
					class="flex-column fill-height h-100 p-0"
					style="padding-left: 0"
				>
					<div 
						id="carre-editeur"
						v-shortkey="['ctrl', 'alt', 'e']"
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
						v-shortkey="['ctrl', 'alt', 'l']"
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
							v-shortkey="['ctrl', 'alt', 'w']"
							@shortkey="changerOngletAvecRaccourci"
						/>
						<div
							v-shortkey="['ctrl', 'alt', 'd']"
							@shortkey="changerModeAffichageAvecRaccourci"
						/>
						<div
							v-shortkey="['ctrl', 'alt', 'arrowup']"
							@shortkey="sélectionnerTestDuHautAvecRaccourci"
						/>
						<div
							v-shortkey="['ctrl', 'alt', 'arrowdown']"
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
