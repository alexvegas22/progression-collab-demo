<template>
	<div class="container-fluid">
		<div class="row">
			<div class="container col-4" v-if="jeuTestsSontOuverts">
				<span>
					<button class="jeuTests-Btn" @click="fermerJeuTests">«</button> 
				</span>
				<h3 style="text-align: left">{{ $t("jeu_tests.jeuTests") }}</h3>
				<div v-for="(test, index) in tests" :key="index">
					<Test v-bind:test="test"
						  v-bind:index="index"
						  v-bind:réussi="resultats[index]"
						  v-bind:non_réussi="resultats[index] == false"
						  v-bind:sélectionné="index==index_select"

						  v-on:select="select(index)"
						  présentation_étape="3.0"
						/>
				</div>
			</div>
			<div v-else class ="sidebar">
				<svg class="énoncé-sidebar-btn" @click="fermerJeuTests" viewBox ="0 0 100 80" width="40" fill ="black">
					<rect width="100" height="10"></rect>
					<rect y="30" width="10" height="10"></rect>
					<rect y="60" width="10" height="10"></rect>
				</svg>
			</div>
			<div class="col-8">
				<ResultatTest v-bind:test="test_select" v-bind:resultat="resultat_select" />
			</div>
			<div class="col-md-12">
				<SélecteurModeAffichage />
			</div>
			
		</div>
		
	</div>
	
</template>

<script src="./jeu_tests.js"></script>
