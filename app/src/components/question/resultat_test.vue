<template>
	<div class="container">
		<div class="row">
			<div class="bg-light col card device-card">
				<div class="card-body">
					<h5 class="text-black-50 font-weight-bold text-center card-title">{{$t('resultat_test.entrée')}}</h5>
					<p class="card-text">{{ entree }}</p>
				</div>
			</div>

			<div class="bg-light col card device-card">
				<div class="card-body">
					<h5 class="text-black-50 font-weight-bold text-center card-title">{{$t('resultat_test.sortieAttendue')}}</h5>
					<p class="card-text">{{ sortie_attendue }}</p>
				</div>
			</div>
		</div>

		<div class="row">
			<div v-if="sortie_erreur" class="bg-light col card device-card">
				<div class="card-body">
					<h5 class="text-danger font-weight-bold text-center card-title">{{$t('resultat_test.sortieErreur')}}</h5>
					<p class="card-text">{{ sortie_erreur }}</p>
				</div>
			</div>

			<div class="bg-light col card device-card">
				<div class="card-body">
					<h5 class="text-black-50 font-weight-bold text-center card-title">{{$t('resultat_test.sortieConsole')}}</h5>
					<p class="card-text">{{ sortie_console }}</p>
				</div>
			</div>
		</div>

		<div class="row">
			<div v-if="feedback" class="bg-light col card device-card">
				<div class="card-body">
					<h5 class="text-black-50 font-weight-bold text-center card-title">{{$t('resultat_test.rétroaction')}}</h5>
					<p class="card-text">{{ $t('resultat_test.rétroaction') }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./resultat_test.js"></script>
