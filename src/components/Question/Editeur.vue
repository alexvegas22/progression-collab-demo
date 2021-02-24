<template>
    <div id="question" class="container-editeur">
        <!--prismditor class="my-editor" v-model="code" :highlight="highlighter" line-numbers></-prismditor-->
    </div>

    <div>
      <ul v-for="unResultat in resultats" :key="unResultat">
        <li>
          resultat: {{unResultat.résultat}}
        </li>
        <li>
          sortie d'erreur: {{unResultat.sortie_erreur}}
        </li>
        <li>
          sortie observée: {{unResultat.sortie_observée}}
        </li>
        <li>
         feedback: {{unResultat.feedback}}
        </li>
      </ul>

      <button @click="valider_tentative">envoie ta reponse</button>

      <h4 v-if="feedback_global">Feedback global: {{feedback_global}}</h4>

      <h3 v-if="testsPassent!=null">Ta reponse est {{testsPassent ? "Bonne" : "Mauvaise" }}</h3>
    </div>
</template>

<script>

  import { getEbauche, envoyerTentative } from '@/util/solution';

  //import { PrismEditor } from 'vue-prism-editor';
  //import 'vue-prism-editor/dist/prismeditor.min.css';
  //import { highlight, languages } from 'prismjs/components/prism-core';
  //import 'prismjs/components/prism-clike';
  //import 'prismjs/themes/prism-dark.css'; // import syntax highlighting styles } from 'vue-prism-editor';

  // Imports des languages
  //import 'prismjs/components/prism-python';
  //import 'prismjs/components/prism-javascript';


  let langage = "python"
  let categorie = 'programmation_1'
  let nom = 'les_fonctions'
  let titre = 'appeler_une_fonction'

  export default {
      components: {
        //PrismEditor,
      },
      data: () => ({
        code: "",
        resultats:[],
        feedback_global:'',
        testsPassent:null
      }),
      methods: {
        highlighter(code) {
          return highlight(code, languages.python);
        },
        valider_tentative(){
          envoyerTentative(langage, this.code).then(
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
                console.log(err);
                this.code = "";
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
