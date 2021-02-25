<template>
  <div id="énoncé">
    <h2>{{ question.attributes.énoncé }}</h2>
  </div>
</template>

<script>

export default {
  name: "Enonce",
  props: ['question']
};
</script>
