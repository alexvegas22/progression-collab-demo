<template>
	<div class="container" v-if="test">
		<div class="row">
			<div class="bg-light col card device-card">
				<div class="card-body" présentation_étape="3.1">
					<h5 class="text-black-50 font-weight-bold text-left card-title">{{ $t("resultat_test.entrée") }}</h5>

					<!--resize: none;  -->
					<textarea v-if="modifiable" class="w-100 border-0 enleverOutline" v-model="test.entrée" ></textarea>
					<pre v-else class="card-text" v-html="test.entrée"></pre>
				</div>
			</div>
		</div>

		<!--  -->
		<!-- ajouter cette verification quand ce n'est pas en mode edition -->
		<div class="row">
			<div class="bg-light col card device-card">
				<div class="card-body">
					<h5 class="text-black-50 font-weight-bold text-left card-title">
						{{ $t("resultat_test.params") }}
					</h5>
					<textarea v-if="modifiable" class="w-100 border-0 enleverOutline" v-model="test.params"></textarea>
					<div v-else><pre class="card-text" v-html="test.params"></pre></div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="bg-light col card device-card">
				<div class="card-body" présentation_étape="3.2">
					<h5 class="text-black-50 font-weight-bold text-left card-title">
						{{ $t("resultat_test.sortieAttendue") }}
					</h5>

					<textarea
						v-if="modifiable"
						class="w-100 border-0"
						v-model="test.sortie_attendue"
						style="outline: none"
					></textarea>

					<div v-else>
						<pre v-if="sortie_attendue">
						 	<p class="card-text" v-html="sortie_attendue"></p>
						</pre>
						<pre v-else>
							<p class="card-text sortie vide">{{ $t("resultat_test.vide") }}</p>
						</pre>
					</div>
				</div>
			</div>

			<div class="bg-light col card device-card" v-if="resultat">
				<div class="card-body" présentation_étape="3.3">
					<h5 class="text-black-50 font-weight-bold text-left card-title">
						{{ $t("resultat_test.sortieConsole") }}
					</h5>
					<pre v-if="sortie_observée"><p class="card-text" v-html="sortie_observée"></p></pre>
					<pre v-else>
						<p class="card-text sortie vide">{{$t("resultat_test.vide")}}</p>
					</pre>
				</div>
			</div>
		</div>

		<div class="row">
			<div v-show="resultat.sortie_erreur" class="bg-light col card device-card" v-if="resultat">
				<div class="card-body">
					<h5 class="text-danger font-weight-bold text-left card-title">
						{{ $t("resultat_test.sortieErreur") }}
					</h5>
					<pre><p class="card-text" v-html="resultat.sortie_erreur"></p></pre>
				</div>
			</div>
		</div>

		<div class="row">
			<div v-show="resultat.feedback" class="bg-light col card device-card" v-if="resultat">
				<div class="card-body">
					<h5 class="text-black-50 font-weight-bold text-center card-title">{{ $t("resultat_test.rétroaction") }}</h5>
					<p class="card-text" v-html="feedback"></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./resultat_test.js"></script>

<style src="./resultat_test.css"></style>
