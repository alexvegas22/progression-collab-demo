<template>
	<div class="row g-0">
    <div class="col-3">
      <div class="bordure-titre p-1">
        {{ $t('jeu_tests.jeuTests') }}
      </div>
      <fenetre-info :style="{height: sectionVisible ? '350px' : '0'}" class="section-bas">
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
    <div class="col-9">
      <div class="section-onglets">
        <div @click="changementOnglet('resultat-test')"
            :class="{onglets: true, sélectionné: ongletSelectionner === 'resultat-test'}">
            <strong>Entrées / Sorties</strong>
        </div>
        
        <div @click="changementOnglet('section-erreur')"
            :class="{onglets: true, sélectionné: ongletSelectionner === 'section-erreur'}"
            v-if="resultat_select && resultat_select.sortie_erreur">
            <strong>Erreurs</strong>
        </div>
        
        <div @click="changementOnglet('commentaires')" 
              :class="{onglets: true, sélectionné: ongletSelectionner === 'commentaires'}"
              v-if="resultat_select && resultat_select.feedback">
              <strong>Commentaires</strong>
        </div>

        <div @click="changementVisibilité()" class="boutton-basculable">
          <i class="fa" :class="{'fa-angle-double-down': sectionVisible, 'fa-angle-double-up': !sectionVisible}" aria-hidden="true"></i>
        </div>
      </div>

      <keep-alive>
        <component 
          :is="ongletSelectionner" 
          :style="{height: sectionVisible ? '350px' : '0'}"
          class="section-bas"
          :test="test_select"
          :resultat="resultat_select"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import ResultatTest from "@/components/question/resultat_test/resultat_test.vue";
import SectionErreur from "@/components/question/section_erreurs/section_erreurs.vue";
import Commentaires from "@/components/question/commentaires/commentaires.vue";
import Test from "@/components/question/test/test.vue";

export default {
  components: {
    Test,
    ResultatTest,
    SectionErreur,
    Commentaires
  },
  data() {
    return {
      sectionVisible: true,
      ongletSelectionner: 'resultat-test',
      index_select: 0
    };
  },
  computed: {
    resultats() {
			var res = [];
			for (var i = 0; i < this.$store.state.question.tests.length; i++) {
				var résultat =
					this.tentative && this.tentative.resultats && i < this.tentative.resultats.length
						? this.tentative.resultats[i].résultat
						: null;
				res.push(résultat);
			}
			return res;
		},
    test_select() {
			return this.$store.state.question.tests[this.index_select];
		},
    resultat_select() {
			return this.tentative && this.tentative.resultats
				? this.$store.state.retroactionTentative.resultats[this.index_select]
				: null;
		},
    tentative() {
			return this.$store.state.retroactionTentative;
		},
    tests() {
			return this.$store.state.question.tests;
		},
  },
  methods: {
    changementOnglet(onglet) {
      this.ongletSelectionner = onglet;
      this.sectionVisible = true;
    },
    changementVisibilité() {
      this.sectionVisible = !this.sectionVisible;
    },
    select(index) {
			this.index_select = index;
		},
  }
}
</script>

<style scoped>
  .section-onglets {
    display:flex;
    flex-flow: row;
  }

  .onglets {
    flex: 1 1 auto;
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding: 3px;
    color: rgba(0, 0, 0, 0.5);
    background: rgba(0, 0, 0, 0.05);
  }

  .sélectionné {
    border-bottom: none;
    background: none !important;
  }

  .boutton-basculable {
    width: 30px;
    cursor: pointer;
    flex: 0 0 auto;
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding: 3px;
    color: rgba(0, 0, 0, 0.5);
    background: rgba(0, 0, 0, 0.05);
  }

  .section-bas {
    overflow: hidden;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .bordure-fenetre {
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-top: none;
  }

  .bordure-titre {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    color: rgba(0, 0, 0, 0.5);
  }
</style>