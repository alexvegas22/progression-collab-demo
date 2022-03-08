<template>
	<div class="container-fluid">
		<div class="row">
			<div class="container col-4">
				<h3 style="text-align: left">
					{{ $t("jeu_tests.jeuTests") }} <button v-on:click="montrerAjouterTest">✎</button>
				</h3>

				

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
						ref="unTest"
					/>
					<button v-show="modifiable" type="button" v-on:click="tests.splice(index, 1)" class="btn border-0 bg-transparent">✘ Supprimer cette question</button>
				</div>
				<div class="row w-100 m-0 p-1" v-show="modifiable">
					<input
						class="col-11 test non_sélectionné p-0 m-0"
						:placeholder="$t('jeu_tests.ajouterTest')"
						v-model="nouveauTestNom"
						@input="AjouterTest()"
						ref="inputAjouterTest"
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
