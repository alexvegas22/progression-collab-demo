<template>
  <div>
    <div class="row">
      <div v-on:click="test.visible = !test.visible" class="container">
        <div class="d-flex flex-row p-2">
          <div class="align-content p-2">
            <span style="font-size:200%;">
              &#10148;
            </span>
          </div>
          <div class="flex-grow-1">
            <div class="d-flex p-2 .flex-row border">
              <p class="p-2">{{ test.attributes.nom }}</p>
              <div class="ml-auto">
                <span style="font-size:200%;" v-if="test.resultat">
                  &#9989;
                </span>
                <span style="font-size:200%;" v-else>
                  &#10060;
                </span>
              </div>
            </div>
          </div>
          <div class="p-2 align-content-xl-end">
            <button class="btn btn-secondary" disabled>
              &#10148; Lancer Le test
            </button>
          </div>
        </div>
        <div v-if="test.visible">
          {{ texteUnTest }}
          <!--<ValidationTentative />-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ValidationTentative from "./ValidationTentative.vue";
export default {
  components: { ValidationTentative },
  name: "Test",
  props: {
    test: {
      required: true,
    },
  },
  watch: {
    test: function() {
      this.texteUnTest = this.test;
    },
  },
  data() {
    return {
      texteUnTest: this.test,
    };
  },
};
</script>
