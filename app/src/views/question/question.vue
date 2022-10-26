<template>
	<div
		v-if="user && question && avancement">
		<div>
			<Présentation
				v-if="démo"
					  présentation_étape="00"
			/>
		</div>
		<div
			v-shortkey="raccourcis.réinitialiser"
						class="taille-écran p-0"
						@shortkey="réinitialiserTentativeAvecRaccourci"
		>
			<div
				class="conteneur-question"
			>
				<MesSplitpanes class="default-theme" gauche=true droite=false>
					<template #gauche>
							<Enonce
								présentation_étape="0"
							/>
					</template>
					<template #droite>
						<MesSplitpanes horizontal="true" class="default-theme" gauche="true" droite="true">
							<template #gauche>
								<div style="height: 100%; display: flex; flex-flow: column"> <!-- maximisé : height: calc(100% - 4.8rem);  -->
								<div
									v-if="tentative"
									id="carre-editeur"
									style="flex-grow: 1; display: flex; flex-flow: column; overflow: auto;"
								>
									<Avancement 
										présentation_étape="2" 
															:tentative-réinitialisée="tentativeRéinitialisée"
									/>
									<EditeurCode style="flex-grow: 1" v-if="tentative"
													 présentation_étape="1"
									/>
								</div>
								<div style="position: relative; height: 1rem">
									<RetroactionTentative/>
									<BoutonSoumission
										style="position: relative; float: right; bottom: 5.2rem"
										@validerTentative="validerTentative"
									/>
								</div>
								</div>
							</template>
							<template #droite>
									<div
										class="col-12"
											   style="height: 100%"
									>
									<onglets-information
										présentation_étape="4"
															:onglet-changé="ongletChangéRaccourci"
															:test-sélectionné-haut="testSélectionnéHaut"
															:test-sélectionné-bas="testSélectionnéBas"
															style="height:100%"
									/>
									<div
										v-shortkey="raccourcis.basculerModeParDifférences"
													@shortkey="changerModeAffichageAvecRaccourci"
									/>
 									<div
 										v-shortkey="raccourcis.itérerOnglets"
 													@shortkey="changerOngletAvecRaccourci"
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
							</template>
						</MesSplitpanes>
					</template>
				</MesSplitpanes>
				<div
					v-if="tentative?.commentaires && indicateursDeFonctionnalitéCommentaires"
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
