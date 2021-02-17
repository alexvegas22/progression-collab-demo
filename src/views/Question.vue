<template>
  <div class="question">
        <h3><strong>Question : {{question}}</strong></h3>
        <!--
        <div class="ebauche" v-bind:key="ebauche" v-for="ebauche in ebauches">
            <p>{{ebauche}}</p>
        </div>
        -->
  </div>
</template>

<script>
// @ is an alias to /src
import get_question from '../util/question'

export default {
  name: 'Question',
  
  components: {
     data() {
        return {
            question: get_question('programmation_1', 'les_variables', 'introduction_aux_variables', 'python').then(
                response => {
                    this.question = response;
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        }
     }
  }
}
</script>

