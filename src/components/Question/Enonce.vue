<template>
  <div id="énoncé">
    <h2>{{ enonce }}</h2>
  </div>
</template>

<script>
export default {
  name: "Enonce",
  props: ["question"],
  data() {
    return {
      enonce: this.question
    };
  }
};
</script>
