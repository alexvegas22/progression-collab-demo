<template>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
  <h1 style="text-align: center;">Jeu de tests</h1>
  <div v-for="test in tests" :key="test">
      <Test v-bind:test="test" />
  </div>
</template>
<script>
import Test from "./Test.vue";
export default {
  components: { Test },
  name: "JeuTests",

  props: {
    tests: {
      required: true,
    },
  },
  watch: {
    tests: function() {
      this.texteTests = this.tests;
    },
  },

  data() {
    return {
      texteTests: this.tests,
    };
  },
};
</script>
