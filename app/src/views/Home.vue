<template>
  <div class="home">
    <Login />
  </div>
</template>

<script>
// @ est un alias de /src
import Login from "@/components/Login.vue";

export default {
  name: "Home",
  components: {
    Login,
  },
};
</script>
