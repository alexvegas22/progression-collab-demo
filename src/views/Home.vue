<template>
  <div class="home">
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";

import ValidationExercice from "@/components/Question/ValidationExercice";
export default {
  name: "Home",
  components: {
    Login,
  },
};
</script>
