<template>
	<div>
		<div class="row h-100 g-0">
			<div class="col-3 h-100" style="overflow-y: auto;">
        <fenetre-info :titre="$t('jeu_tests.jeuTests')" style="height:100%;">
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
        </fenetre-info>
			</div>
			<div class="col-9 h-100">
				<ResultatTest v-bind:test="test_select" v-bind:resultat="resultat_select" />
			</div>
		</div>
	</div>
</template>

<script src="./jeu_tests.js"></script>
