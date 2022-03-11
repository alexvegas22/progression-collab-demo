<template>
  <nav class="navbar navbar-expand-sm p-0" :class="{thème_sombre: thèmeSombre, 'navbar-light': !thèmeSombre,'bg-light': !thèmeSombre}">
    <ul class="navbar-nav">
      <Avancement :thèmeSombre="thèmeSombre" présentation_étape="2"/>
      <Affichage :thèmeSombre="thèmeSombre" />
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
  },
  computed: {
    thèmeSombre(){
			return this.$store.state.thèmeSombre;
		}
  }
}
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }

  .thème_sombre .navbar-nav a,
  .thème_sombre .navbar-nav button,
  .thème_sombre .navbar-nav li {
    color: white !important;
  }

  .thème_sombre .dropdown-item:hover {
    background-color: #999 !important;
  }

  .dropdown-menu {
    border-radius: 0;
    margin-top: 0;
    border-color: black;
  }
</style>