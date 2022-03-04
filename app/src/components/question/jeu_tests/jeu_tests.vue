<template>
	<div class="container-fluid">
		<div class="row">
			<div class="container col-4">
				<h3 style="text-align: left">
					{{ $t("jeu_tests.jeuTests") }} <button v-on:click="montrerAjouterTest"> ✎</button>
				</h3>

				<!-- Quand on clique sur le bouton le input ajout un test appartait  -->

				<div class="row w-100 m-0 p-1" id="champAjouterTest" v-show="modifiable" >
					<input
						class="col-11 test non_sélectionné p-0 m-0"
						:placeholder="$t('jeu_tests.ajouterTest')"
						id="nomTestAjoute"
					/>
					<button class="col-1" v-on:click="AjouterTest()">+</button>
				</div>

				<div v-for="(test, index) in tests" :key="index">
					<Test
						v-bind:test="test"
						v-bind:index="index"
						v-bind:réussi="resultats[index]"
						v-bind:non_réussi="resultats[index] == false"
						v-bind:sélectionné="index == index_select"
						v-bind:modifiable="modifiable"
						v-on:select="select(index)"
						présentation_étape="3.0"
					/>
				</div>
			</div>
			<div class="col-8">
				<ResultatTest v-bind:test="test_select" v-bind:resultat="resultat_select" v-bind:modifiable="modifiable" />
			</div>
			<div class="col-md-12">
				<SélecteurModeAffichage />
			</div>
		</div>
	</div>
</template>

<script src="./jeu_tests.js"></script>
