<template>
	<div
		v-if="user && question && avancement"
	>
		<div>
			<Présentation
				v-if="démo"
				présentation_étape="00"
			/>
		</div>
		<div
			v-shortkey="raccourcis.réinitialiser"
			@shortkey="réinitialiserTentativeAvecRaccourci"
			class="full-flex ffrow"
			style="padding: 7px"
		>
			<Diptyque droite="fixe" :size_gauche="taillePanneauÉnoncé" :size_droite="100-taillePanneauÉnoncé" @redimensionnéGauche="redimensionnéÉnoncé">
				<template #gauche>
					<Enonce
						présentation_étape="0"
					/>
				</template>
				<template #droite>
					<Diptyque horizontal="true" droite="fixe" :size_gauche="tailleÉditeur" :size_droite="100-tailleÉditeur" @redimensionnéGauche="redimensionnéÉditeur">
						<template #entête_gauche v-if="question_type=='prog'">
							<Avancement
								présentation_étape="2"
								:tentative-réinitialisée="tentativeRéinitialisée"
								:title="$t('avancement.choixLangage')"
							/>
						</template>
						<template #gauche>
							<div v-if="question_type=='prog'" class="full-flex ffcolumn">
								<EditeurCode style="flex-grow: 1; overflow: auto" 
									v-if="tentative"
									présentation_étape="1"
								/>
								<div style="position: relative; height: 0.75rem">
									<RetroactionTentative/>
								</div>
							</div>
							<div v-if="question_type=='sys' && tentative?.url_terminal" class="full-flex ffcolumn">
								<TTYShare :url="tentative.url_terminal">
								</TTYShare>
							</div>
						</template>
						<template #entête_droite
						>
							<div class="full-flex ffrow" >
								<div style="width: fit-content">
									{{ $t("jeu_tests.jeuTests") }}
								</div>
								<div>
									<BoutonRéinitialiserTests  />
								</div>
							</div>
						</template>
						<template #droite>
							<onglets-information
								présentation_étape="4"
								:test-sélectionné-haut="testSélectionnéHaut"
								:test-sélectionné-bas="testSélectionnéBas"
								:test-sélectionné-valider="testSélectionnéValider"
							/>
							<div
								v-shortkey="raccourcis.itérerTestHaut"
								@shortkey="sélectionnerTestDuHautAvecRaccourci"
							/>
							<div
								v-shortkey="raccourcis.itérerTestBas"
								@shortkey="sélectionnerTestDuBasAvecRaccourci"
							/>
							<div
								v-shortkey="raccourcis.lancerTestUnique"
								@shortkey="lancerTestUniqueAvecRaccourci"
							/>
						</template>
					</Diptyque>
				</template>
			</Diptyque>
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
		<PanneauCommentaire
			:menuCommentaireOuvert="panneauCommentaireOuvert"
			@basculerMenuCommentaire="basculerMenuCommentaire"
		/>
	</div>
</template>

<script src="./question.js"></script>
<style src="./question.css" ></style>
<style src="../../css/mainMenu.css"></style>
