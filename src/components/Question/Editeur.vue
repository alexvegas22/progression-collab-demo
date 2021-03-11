<template>
    <div id="question" class="container-editeur">
        <prismEditor id="editor" class="my-editor" v-model="code" :highlight="highlighter" line-numbers></prismEditor>
    </div>
     <ValidationTentative v-bind:code="code" v-bind:langage="question.langage"/>
</template>

<script>

  import ValidationTentative from '@/components/Question/ValidationTentative';
  import { getData } from '@/util/solution';

  import { PrismEditor } from 'vue-prism-editor';
  import 'vue-prism-editor/dist/prismeditor.min.css';
  import { highlight, languages } from 'prismjs/components/prism-core';
  import 'prismjs/components/prism-clike';
  import 'prismjs/themes/prism-dark.css'; // import syntax highlighting styles } from 'vue-prism-editor';

  // Imports des languages
  import 'prismjs/components/prism-python';
  import 'prismjs/components/prism-javascript';


  export default {
      components: {
        PrismEditor,
        ValidationTentative
      },
      props: ['question'],
      watch: {
        question: function () {
          this.setEbauche();
        }
      },
      data: () => ({
        code: ""
      }),
      methods: {
        highlighter(code) {
          // prend le langage sélectionné par l'utilisateur et retourne les highlights
          return highlight(code, languages["python"]);
        },
        setEbauche() {
          // À remplacer par `question.relationships.ébauches.links.self` quand le mock de question est fait
          getData("http://localhost:3000/QuestionProg/cHJvZzEvbGVzX2ZvbmN0aW9uc18wMS9hcHBlbGVyX3VuZV9mb25jdGlvbl9wYXJhbcOpdHLDqWU=/relationships/ebauche").then(
            data => {
              this.code = data.attributes.code;
            }
          ).catch(
            err =>{
              this.code = "";
            }
          )
        }
      },
      mounted() {
        if (this.question != undefined && this.question.langage != undefined)
          this.setEbauche()
      }
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

  .container-editeur {
      display: flex;
      width: 100%;
      height: 100%;
  }

  .container-editeur .division {
      width: 50%;
  }

  .container-editeur .division#resultat {
      padding: 0px 20px;
  }
</style>
