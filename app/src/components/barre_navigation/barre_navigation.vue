<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark" v-if="avancement">
    <ul class="navbar-nav">
      <Avancement présentation_étape="2" style="flex: 0 0 auto;"/>
    </ul>
  </nav>
</template>

<script>
import Avancement from "@/components/question/avancement/avancement.vue";

export default {
  inject: ['avancement'],
  components: {
    Avancement
  }
}
</script>

<style>

</style>