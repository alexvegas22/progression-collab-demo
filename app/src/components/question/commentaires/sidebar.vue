<template>
	<div class="sidebar">
		<div
			v-if="menuCommentaireOuvert"
			class="sidebar-backdrop"
			@click="fermerMenuCommentaire"
		/>
		<transition name="slide">
			<div
				v-if="menuCommentaireOuvert"
				class="sidebar-panel"
			>
				<div class="container">
					<div class="row">
						<div class="col-12">
							<textarea
								v-model.trim="commentaire"
								type="text"
								class="input"
								:placeholder="$t('commentaire.placeholderCommentaire')"
							/>
							<label
								class="labelLigne"
								for="numeroLigne"
							>{{ $t("commentaire.ligneCommentaire") }} </label>
							<input
								id="numeroLigne"
								v-model="numeroLigne"
								type="number"
								name="numeroLigne"
								min="0"
							>
							<button
								class="btnComment float-right"
								type="submit"
								name="validerEtSoumettreCommentaire"
								@click="verificationSoumissionCommentaire"
							>
								{{ $t("commentaire.ajouterCommentaire") }}
							</button>
							<div
								v-if="commentaire_vide || numeroLigneVide || numeroNonEntier"
								class="erreur"
							>
								{{ $t("commentaire.erreurAjoutCommentaire") }}
							</div>
						</div>
					</div>
				</div>
				<div class="container bootstrap snippets bootdey">
					<div class="row">
						<div class="col-md-12">
							<div class="blog-comment">
								<h3>{{ $t("commentaire.commentaires") }}</h3>
								<hr>
								<ul
									v-for="elem in commentaires"
									:key="elem.id"
									class="comments"
								>
									<li class="clearfix">
										<div class="post-comments">
											<p class="meta">
												{{ elem.créateur }}<span class="texteNumLign">{{ elem.numéro_ligne }}</span>
											</p>
											<p>{{ elem.message }}</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script src="./sidebar.js"></script>
<style src="./sidebar.css"></style>