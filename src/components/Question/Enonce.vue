<template>
  <div id="enonce">
    <h1>{{ titre }}</h1>
    <h2>{{ enonce }}</h2>
  </div>
</template>

<script>
export default {
  name: "Enonce",
  props: ["titre", "enonce"]
};
</script>
