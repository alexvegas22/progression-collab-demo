<template>
    <div id="question" class="container-editeur">
        <prismEditor id="editor" class="my-editor" v-model="code" :highlight="highlighter" line-numbers></prismEditor>
    </div>
    <button :disabled="messageCnxAPI.length===34" @click="valider_tentative">envoie ta reponse</button>
    <!-- TODO :Gerer le traitement d'erreur -->
   <div v-if="resultats.length>0 || messageCnxAPI!=null">
     <AffichageValidation v-bind:message_connexion_API="messageCnxAPI"
                          v-bind:résultats="resultats"
                          v-bind:feedback_global="feedback_global"
                          v-bind:testsPassent="testsPassent"/>
   </div>
</template>

<script>

  import AffichageValidation from '@/components/Question/AffichageValidation';
  import { getData, envoyerTentative } from '@/util/solution';

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
        AffichageValidation
      },
      props: ['question'],
      watch: {
        question: function () {
          this.setEbauche();
        }
      },
      data: () => ({
        code: "",
        resultats:[],
        feedback_global:'',
        testsPassent:null,
        messageCnxAPI: ""
      }),
      methods: {
        highlighter(code) {
          // prend le langage sélectionné par l'utilisateur et retourne les highlights
          return highlight(code, languages["python"]);
        },
        valider_tentative() {
          this.messageCnxAPI="Envoie de la tentative en cours..."
          envoyerTentative(this.question.langage, this.code).then(
            tentative => {
              //si on recoit une reponse le message devient null, la reponse sera affichee
                this.messageCnxAPI="";
                this.resultats = tentative.résultats
                this.feedback_global = tentative.feedback

                //variable qui sera a false si ce ne sont pas tous les tests qui passent
                this.testsPassent = true;

                //on itère à travers tous les tests pour voir s'il y en a un qui ne passent pas.
                for(let unResultat of tentative.résultats){
                  if(unResultat.résultat === "false") {
                    this.testsPassent = false;
                    break;
                  }
                }
            }
          ).catch(
            err => {
                console.log(err);
                //message d'erreur si on ne peut pas joindre l'API
                this.messageCnxAPI="Impossible de communiquer avec le super serveur de validation :("
            }
          )
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
