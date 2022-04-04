<template>
	<div>
		<div v-if="user">
			<Présentation
				v-if="démo"
				présentation_étape="00"
			/>
		</div>

		<div
			class="container-fluid taille-ecran p-0"
			:class="{ thème_sombre: thèmeSombre }"
		>
			<div
				v-if="avancement"
				class="d-flex h-100"
			>
				<Enonce
					:class="{
						'énoncé-plein': énoncéPleinÉcran,
						'énoncé-semi': énoncéSemiÉcran,
						'énoncé-padding': énoncéSemiÉcran || énoncéPleinÉcran }"
					:énoncéPleinÉcran="énoncéPleinÉcran"
					:énoncéSemiÉcran="énoncéSemiÉcran"
					présentation_étape="0"
					@ajustéPanneauÉnoncé="ajusterPanneauÉnoncé"
				/>

				<div
					v-show="!énoncéPleinÉcran"
					class="flex-column fill-height h-100 p-0"
					style="padding-left: 0"
				>
					<div
						id="carre-editeur"
						class="col-12 flex-column fill-height m-n-0"
						style="flex: 1 1 auto; position: relative"
					>
						<Avancement
							présentation_étape="2"
							style="flex: 0 0 auto"
							:pleinÉcran="éditeurPleinÉcran"
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
							<RetroactionTentative présentation_étape="3" />
						</div>
					</div>
					<div class="col-12">
						<onglets-information
							:panneau-affiché="panneauTestsAffiché"
							présentation_étape="4"
							@basculéPanneauTests="basculerPanneauTests"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>

