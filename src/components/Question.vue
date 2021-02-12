<template>
    <div id="question" class="container-editeur">
        <div class="division">
            <codemirror
            ref="cmEditor"
            :code="code"
            :options="cmOptions"
            @ready="onCmReady"
            @focus="onCmFocus"
            @input="onCmCodeChange"
            />
        </div>
        <div id="resultat" class="division">Votre code ne fonctionne pas. :(</div>
    </div>
</template>

<script>
let langage = "python"
let categorie = 'programmation_1'
let nom = 'les_fonctions'
let titre = 'appeler_une_fonction'

import { codemirror } from 'vue-codemirror'
// import base style
import 'codemirror/lib/codemirror.css'

// Modes
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/javascript/javascript.js'

// importation du question.js
import get_ebauche from '../util/question';

// Theme darcula (choix du à sa visibilité)
import 'codemirror/theme/darcula.css'

export default {
    components:{
        codemirror
    },
    data () {
        return {
            code: "",
            cmOptions: {
                tabSize: 4,
                mode: langage,
                theme: 'darcula',
                lineNumbers: true,
                line: true,
                smartIndent: true,
                refresh:true
            }
        }
    },
    methods: {
        onCmReady(cm) {
            console.log('the editor is readied!', cm)
        },
        onCmFocus(cm) {
            console.log('the editor is focused!', cm)
        },
        onCmCodeChange(newCode) {
            console.log('this is new code', this.codemirror.options.mode)
            this.code = newCode
        }
    },
    computed: {
        codemirror() {
            return this.$refs.cmEditor.codemirror
        }
    },
    mounted() {
        console.log('the current CodeMirror instance object:', this.codemirror)
        get_ebauche(categorie, nom, titre, langage).then(
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
}
</script>


<style>
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
