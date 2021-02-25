<template>
    <div id="question" class="container-editeur">
        <!--prismditor class="my-editor" v-model="code" :highlight="highlighter" line-numbers></prismditor-->
    </div>
    <button @click="valider_tentative">envoie ta reponse</button>
    <!-- TODO :Gerer le traitement d'erreur -->
   <div v-if="resultats.length>0">
     <AffichageValidation v-bind:résultats="resultats" v-bind:feedback_global="feedback_global" v-bind:testsPassent="testsPassent"/>
   </div>
  <slot></slot>

</template>

<script>

  import {getEbauche, envoyerTentative } from '@/util/solution';
  import AffichageValidation from '@/components/Question/AffichageValidation';

  //import { PrismEditor } from 'vue-prism-editor';
  //import 'vue-prism-editor/dist/prismeditor.min.css';
  //import { highlight, languages } from 'prismjs/components/prism-core';
  //import 'prismjs/components/prism-clike';
 // import 'prismjs/themes/prism-dark.css'; // import syntax highlighting styles } from 'vue-prism-editor';

  // Imports des languages
  //import 'prismjs/components/prism-python';
  //import 'prismjs/components/prism-javascript';


  let langage = "python"
  let categorie = 'programmation_1'
  let nom = 'les_fonctions'
  let titre = 'appeler_une_fonction'
  let code= 'fgrsdgfrsd'
  export default {
      components: {
        //PrismEditor,
        AffichageValidation
      },
      data: () => ({
        code: "",
        resultats:[],
        feedback_global:'',
        testsPassent:false
        //messageErreur:String
      }),
      methods: {
       // highlighter(code) {
         // return highlight(code, languages.python);
       // },
        valider_tentative(){
          envoyerTentative(langage, "ddd").then(
            tentative => {
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
                this.reponse = "";
            }
          )
        },
      },
      mounted() {
          getEbauche(categorie, nom, titre, langage).then(
            ebauche => {
                this.code = ebauche;
            }
          ).catch(
            err =>{
                this.messageErreur="Impossible de communiquer avec le super serveur de validation :("
                console.log(err);
            }
          )
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
