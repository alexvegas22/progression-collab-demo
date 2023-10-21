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
								<div v-if="question_type=='prog'" style="height: 100%; display: flex; flex-flow: column">
									<div
										v-if="tentative"
										id="carre-editeur"
										style="flex-grow: 1; display: flex; flex-flow: column; overflow: auto;"
									>
										<EditeurCode style="flex-grow: 1" v-if="tentative"
											présentation_étape="1"
										/>
									</div>
									<div style="position: relative; height: 0.75rem">
										<RetroactionTentative/>
									</div>
								</div>
								<div v-if="question_type=='sys' && tentative?.url_terminal" style="height: 100%; display: flex; flex-flow: column">
									<TTYShare :url="tentative.url_terminal">
									</TTYShare>
								</div>
							</template>
							<template #entête_droite>
								<div style="display: flex; flex-flow: row; align-items: center; width: fit-content">
									<div style="flex-grow: 1">
										{{ $t("jeu_tests.jeuTests") }}
									</div>
									<BoutonRéinitialiserTests />
								</div>
							</template>
							<template #droite>
								<onglets-information
									présentation_étape="4"
									:onglet-changé="ongletChangéRaccourci"
									:test-sélectionné-haut="testSélectionnéHaut"
									:test-sélectionné-bas="testSélectionnéBas"
									:test-sélectionné-valider="testSélectionnéValider"
									style="height:100%"

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
