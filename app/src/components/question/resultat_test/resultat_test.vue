<template>
	<div class="row g-0">
		<div class="col-12 h-100">
			<div class="h-100 d-flex" v-if="test" style="flex-flow: column">
				<div class="d-flex resultat-test" style="flex-flow: row; flex: 1 1 0; height: 50%">
					<fenetre-info :titre="$t('resultat_test.entrée')">
						<pre class="card-text p-3" v-html="test.entrée"></pre>
					</fenetre-info>

					<fenetre-info :titre="$t('resultat_test.params')" v-if="test.params">
						<pre class="card-text" v-html="test.params"></pre>
					</fenetre-info>
				</div>

				<div class="d-flex resultat-test" style="flex-flow: row; flex: 1 1 0; height: 50%">
					<fenetre-info :titre="$t('resultat_test.sortieAttendue')">
						<pre v-if="sortie_attendue"><p class="card-text p-3" v-html="sortie_attendue"></p></pre>
						<pre v-else>
              				<p class="card-text sortie vide p-3">{{ $t("resultat_test.vide") }}</p>
						</pre>
					</fenetre-info>

					<fenetre-info :titre="$t('resultat_test.sortieConsole')" v-if="resultat">
						<pre v-if="sortie_observée"><p class="card-text p-3" v-html="sortie_observée"></p></pre>
						<pre v-else>
                			<p class="card-text sortie vide p-3">{{$t("resultat_test.vide")}}</p>
              			</pre>
					</fenetre-info>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./resultat_test.js"></script>

<style src="./resultat_test.css"></style>