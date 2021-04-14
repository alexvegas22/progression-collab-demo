import { VAceEditor } from "vue3-ace-editor";
import brace from "brace";
import "brace/mode/python";
import "brace/theme/monokai";

export default {
  components: {
    VAceEditor,
  },
  computed: {
    code() {
      //return this.$store.state.tentative.code;
      if(this.$store.state.tentative){
        return this.$store.state.tentative.code;
      } else{
        return /*this.$store.state.question.ebauches["python"].code*/ "Mon code"
      }
    },
    langage() {
      //return this.$store.state.tentative.langage;
      if(this.$store.state.tentative){
        return this.$store.state.tentative.langage;
      } else{
        return /*this.$store.state.question.ebauches["python"].langage*/ "python"
      }
    },
  },
  methods: {
    editorInit: function () {
      require("brace/ext/language_tools");
      require("brace/mode/html");
      require("brace/mode/python");
      require("brace/mode/less");
      require("brace/theme/monokai");
    },
  },
};
