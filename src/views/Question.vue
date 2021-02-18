<template>
  <div class="question">
    <Enonce />

    <div class="division">
      <EditeurCode />
    </div>
    <div class="division">
      <Feedback />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Enonce from "@/components/Énoncé.vue";
import Feedback from "@/components/Feedback.vue";
import EditeurCode from '@/components/Editeur.vue'

export default {
  name: "Question",
  components: {
    Enonce,
    EditeurCode,
    Feedback
  },
};
</script>

<style>
  .division {
    width: 50%;
    height: 300px;
    float: left;
  }
</style>
