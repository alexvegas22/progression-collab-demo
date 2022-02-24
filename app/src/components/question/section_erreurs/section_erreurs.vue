<template>
  <div class="section-erreur">
    <h5 class="text-danger font-weight-bold text-left card-title">
      {{ $t("resultat_test.sortieErreur") }}
    </h5>
    <pre><p class="card-text" v-html="resultat.sortie_erreur"></p></pre>
  </div>
</template>

<script>
export default {
  props: {
		test: null,
		resultat: null,
	},
}
</script>

<style scoped>
  .section-erreur {
    flex: 1 1 0px;
    min-height: 0px;
    flex-flow: column;
    height: 350px;
    padding:10px;
  }
</style>