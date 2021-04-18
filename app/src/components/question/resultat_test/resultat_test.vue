<template>
	<div class="container">
		<div class="row">
			<div class="bg-light col card device-card">
				<div class="card-body">
					<h5 class="text-black-50 font-weight-bold text-center card-title">Entrée</h5>
					<p class="card-text" v-html="test.entrée"></p>
				</div>
			</div>

			<div class="bg-light col card device-card">
				<div class="card-body">
					<h5 class="text-black-50 font-weight-bold text-center card-title">Sortie Attendue</h5>
					<pre>
						<p class="card-text" v-html="test.sortie_attendue"></p>
					</pre>
				</div>
			</div>
		</div>

		<div v-if="resultat">
			<div class="row">
				<div v-if="resultat.sortie_erreur" class="bg-light col card device-card">
					<div class="card-body">
						<h5 class="text-danger font-weight-bold text-center card-title">Sortie erreur</h5>
						<pre>
							<p class="card-text" v-html="resultat.sortie_erreur"></p>
						</pre>
					</div>
				</div>

				<div class="bg-light col card device-card">
					<div class="card-body">
						<h5 class="text-black-50 font-weight-bold text-center card-title">Sortie console</h5>
						<pre>
							<p class="card-text" v-html="resultat.sortie_observée"></p>
						</pre>
					</div>
				</div>
			</div>

			<div class="row">
				<div v-if="resultat.feedback" class="bg-light col card device-card">
					<div class="card-body">
						<h5 class="text-black-50 font-weight-bold text-center card-title">Feedback</h5>
						<p class="card-text" v-html="resultat.feedback"></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./resultat_test.js"></script>
