<template>
	<div class="container-fluid">
		<div class="row">
			<div class="container col-4">
				<h3 style="text-align: left">{{ $t("jeu_tests.jeuTests") }}</h3>
				<div v-for="(test, index) in tests" :key="index">
					<Test
						v-bind:test="test"
						v-bind:index="index"
						v-bind:réussi="resultats[index]"
						v-bind:non_réussi="resultats[index] == false"
						v-bind:sélectionné="index == index_select"
						v-on:select="select(index)"
						présentation_étape="3.0"
					/>
				</div>
			</div>

			<div class="col-8">
				<TabNav :tabs="['Résultats', 'Rétroactions']" :selected="selected" @selected="setSelected">
					<Tab :isSelected="selected === 'Résultats'">
						<ResultatTest v-bind:test="test_select" v-bind:resultat="resultat_select" />
					</Tab>
					<Tab :isSelected="selected === 'Rétroactions'">
						<div v-for="(feedback, index) in feedbacks_label" :key="index">
							<Rétroaction
								:test="true"
								:feedback_label="feedbacks_label[index]"
								:feedback_valeur="feedback_select(index)"
								:feedback_index="index"
								:test_index="index_select"
							/>
						</div>
					</Tab>
				</TabNav>
			</div>

			<div class="col-md-12">
				<SélecteurModeAffichage />
			</div>
		</div>
	</div>
</template>

<script src="./jeu_tests.js"></script>
