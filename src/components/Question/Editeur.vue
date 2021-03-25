<template>
  <div>
    <prismEditor
      id="editor"
      class="my-editor"
      v-model="code"
      :highlight="highlighter"
      line-numbers>
    </prismEditor>
  </div>
</template>

<script>
import ValidationTentative from "@/components/Question/ValidationTentative";

import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/themes/prism-dark.css"; // import syntax highlighting styles } from 'vue-prism-editor';

// Imports des languages
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";

export default {
  components: {
    PrismEditor,
    ValidationTentative,
  },
  // À chaque fois que l'ébauche change, on met à jour le code et le langage
  watch: {
    ebauche: function() {
      this.code = this.ebauche.attributes.code;
      this.langage = this.ebauche.attributes.langage;
    },
  },
  props: ["question"],
  data: () => ({
    code: "",
    langage: "python",
  }),
  methods: {
    highlighter(code) {
      // prend le langage sélectionné par l'utilisateur et retourne les highlights
      return highlight(code, languages[this.langage]);
    },
  },
  computed: {
    ebauche() {
      return this.$store.state.ebauche;
    },
  },
  mounted() {},
};
</script>

<style>
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;
  height: 100%;
  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}

.my-editor pre {
  color: #f6f6f6;
}
</style>
