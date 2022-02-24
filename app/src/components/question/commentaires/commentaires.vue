<template>
  <div class="section-commentaire">
    <p class="card-text" v-html="resultats.feedback"></p>
  </div>
</template>

<script>
export default {
  props: ['resultats']
}
</script>

<style scoped>
  .section-commentaire {
    flex: 1 1 0px;
    min-height: 0px;
    flex-flow: column;
    height: 350px;
    padding:10px;
  }
</style>