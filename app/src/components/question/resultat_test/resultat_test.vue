<template>
	<div class="container">
		<div class="row">
			<div class="bg-light col card device-card">
				<div class="card-body">
					<h5 class="text-black-50 font-weight-bold text-center card-title">{{$t('resultat_test.entrée')}}</h5>
					<p class="card-text" v-html="test.entrée"></p>
				</div>
			</div>

			<div class="bg-light col card device-card">
				<div class="card-body">
					<h5 class="text-black-50 font-weight-bold text-center card-title">{{$t('resultat_test.sortieAttendue')}}</h5>
					<pre>
						<p class="card-text" v-html="test.sortie_attendue"></p>
					</pre>
				</div>
			</div>
		</div>

<		<div v-if="resultat">
			<div class="row">
				<div v-if="resultat.sortie_erreur" class="bg-light col card device-card">
					<div class="card-body">
						<h5 class="text-danger font-weight-bold text-center card-title">{{$t('resultat_test.sortieErreur')}}</h5>
						<pre>
							<p class="card-text" v-html="resultat.sortie_erreur"></p>
						</pre>
					</div>
				</div>

				<div class="bg-light col card device-card">
					<div class="card-body">
						<h5 class="text-black-50 font-weight-bold text-center card-title">{{$t('resultat_test.sortieConsole')}}</h5>
						<pre>
							<p class="card-text" v-html="resultat.sortie_observée"></p>
						</pre>
					</div>
				</div>
			</div>

			<div class="row">
				<div v-if="resultat.feedback" class="bg-light col card device-card">
					<div class="card-body">
						<h5 class="text-black-50 font-weight-bold text-center card-title">{{$t('resultat_test.rétroaction')}}</h5>
						<p class="card-text" v-html="resultat.feedback"></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./resultat_test.js"></script>
