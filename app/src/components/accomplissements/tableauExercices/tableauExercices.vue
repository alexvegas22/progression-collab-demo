<template>
	<div v-if="avancements">
		<v-container>
			<div>
				<v-text-field
					id="barreRecherche"
					v-model="filtreDeRecherche"
					variant="outlined"
					prepend-inner-icon="mdi-magnify"
				></v-text-field>
			</div>
			<div>
				<v-table
					height="75vh"
					fixed-header
					fixed-footer
					class="tableau bordureBas"
					theme="dark"
				>
					<thead>
						<tr>
							<th class="text-left texte">
								{{
									$t("accomplissements.titreQuestion")
								}}
							</th>
							<th class="text-left texte">
								{{
									$t("accomplissements.difficulté")
								}}
							</th>
							<th class="text-left texte">
								{{
									$t("accomplissements.dateDeDernièreTentative")
								}}
							</th>
							<th 
								class="text-left texte"
							>
								{{
									$t("accomplissements.dateDeRéussite")
								}}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="avancement in this.filtreAvancement"
							:key="avancement"
							class="lienQuestion bordures"
							@click="allerVersQuestion(avancement.liens.self)"
						>
							<td>{{ avancement.titre }}</td>
							<td>{{ avancement.niveau }}</td>
							<td>{{ timestampVersDate(avancement.date_modification) }}</td>
							<td>{{ timestampVersDate(avancement.date_réussite) }}</td>
						</tr>
					</tbody>
				</v-table>
			</div>
		</v-container>
	</div>
</template>

<script src="./tableauExercices.js"></script>
<style scoped src="./tableauExercices.css"></style>
