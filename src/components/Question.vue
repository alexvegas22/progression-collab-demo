<template>
  <div id="Retroaction">
      {{sortieObserver}}
      <h1>TEST</h1>
    <button v-on:click="retro()">Cliquer</button>
  </div>
</template>

<script>
import Thèmes from './Thème.vue'
import fetchapi from '../util/question'
import RetroJS from '../util/questionjs';

export default {
    name: 'Question',
    components: {
        RetroJS
    },
    props: {

    },
    data() {
      return {

      }
    },
    methods: {
        retro() {
        fetchapi("username","password").then(
            Test => {
                this.sortieAttendue = sortie_attendue;
                this.sortieObserver = sortie_observée;
                this.sortieErreur = sortie_erreur;
                }
            )
        }
    },
};
</script>
