<template>
  <div id="énoncé">
    <h2>{{ question.attributes.énoncé }}</h2>
  </div>
</template>

<script>

export default {
  name: "Énoncé",
  props: ['question']
};
</script>
