<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light p-0">
    <ul class="navbar-nav">
      <Avancement présentation_étape="2"/>
      <Affichage />
    </ul>
  </nav>
</template>

<script>
import Avancement from "@/components/question/avancement/avancement.vue";
import Affichage from "@/components/question/affichage/affichage.vue";

export default {
  inject: ['avancement'],
  components: {
    Avancement,
    Affichage
  }
}
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }

  nav a {
    
  }
</style>