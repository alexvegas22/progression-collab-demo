<template>
  <div id="énoncé">
    <h2>{{ enonce }}</h2>
  </div>
</template>

<script>
import { getEnonce } from "@/util/enonce.js";

export default {
  name: "Énoncé",

  data() {
    return {
      enonce: "",
    };
  },
  mounted() {
    getEnonce().then(
      enonce => {
          this.enonce = enonce;
      }
    ).catch(
      err => {
          console.log(err);
          this.enonce = "";
      }
    )
  }
};
</script>
