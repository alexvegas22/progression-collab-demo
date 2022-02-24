<template>
	<div class="h-100 d-flex" v-if="test">
    <fenetre-info :titre="$t('resultat_test.entrée')">
      <pre class="card-text p-3" v-html="test.entrée"></pre>
    </fenetre-info>


		<div v-if="test.params" style="flex: 1 1 0;">
			<div class="bg-light col card device-card">
				<div class="card-body">
					<h5 class="text-black-50 font-weight-bold text-left card-title">
						{{ $t("resultat_test.params") }}
					</h5>
					<pre class="card-text" v-html="test.params"></pre>
				</div>
			</div>
		</div>


		<div class="d-flex" style="flex-flow: column; flex: 1 1 0; height: inherit;">
      <fenetre-info :titre="$t('resultat_test.sortieAttendue')">
        <pre v-if="sortie_attendue"><p class="card-text p-3" v-html="sortie_attendue"></p></pre>
        <pre v-else>
          <p class="card-text sortie vide p-3">{{ $t("resultat_test.vide") }}</p>
        </pre>
      </fenetre-info>
      
      <fenetre-info :titre="$t('resultat_test.sortieConsole')" v-if="resultat">
        <pre v-if="sortie_observée"><p class="card-text" v-html="sortie_observée"></p></pre>
					<pre v-else>
						<p class="card-text sortie vide p-3">{{$t("resultat_test.vide")}}</p>
					</pre>
      </fenetre-info>
		</div>
		
		<div>
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
