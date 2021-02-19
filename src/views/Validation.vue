<template>
  <div class="validation">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ValidationExercice language="python"/>
  </div>
</template>

<script>


import ValidationExercice from "@/components/Question/ValidationExercice";
export default {
  name: "Validation",
  components: {
    ValidationExercice
  }
};
</script>