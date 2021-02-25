<template>
  <div class="question">

        <p>Voici les ébauches disponibles :</p>
        <div class="ebauche" v-bind:key="ebauche" v-for="ebauche in ebauches">
            <p>{{ebauche}}</p>
        </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Ebauche',
  props: {ebauches:Array}
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
