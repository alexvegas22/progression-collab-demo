<template>
  <div class="question">
        
        <h2><strong>{{question.enoncé}}</strong></h2>
        <p>Voici les ébauches disponibles :</p>
        <div class="ebauche" v-bind:key="ebauche" v-for="ebauche in ebauches">
            <p>{{ebauche}}</p>
        </div>
        
  </div>
</template>

<script>
// @ is an alias to /src
import get_question from '../util/question'

export default {
  name: 'Question',
     data() {
        return {
            ebauches:[], // liste d'ébauche

            question: get_question('programmation_1', 'les_variables', 'introduction_aux_variables', 'python').then(
                response => {
                    this.question = response;
                    this.ebauches = response.question_prog.ébauches;
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        }
     }
}
</script>


<style>
    body {
        font-family: "Avenir", Arial, Helvetica, sans-serif;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: auto;
        height: 80vh;
        font-size: 16px;
    }

    .ebauche {
        display: flex;
        padding: 1rem;
        margin: 1rem;
        background: darkgray;
    }
</style>