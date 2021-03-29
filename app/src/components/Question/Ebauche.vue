<template>
  <div class="question">
    <p>Voici les ébauches disponibles :</p>
    <div class="ebauche" v-bind:key="ebauche" v-for="ebauche in ebauches">
      <p>{{ ebauche }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ebauche",
  props: { ebauches: Array },
};
</script>

<style>
.ebauche {
  display: flex;
  padding: 1rem;
  margin: 1rem;
  background: darkgray;
}
</style>
