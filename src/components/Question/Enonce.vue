<template>
  <div id="enonce">
    <h3 class="titre">{{ titre }}</h3>
    <br />
    <p class="enonce">{{ enonce }}</p>
  </div>
</template>

<script>
export default {
  name: "Enonce",
  props: ["titre", "enonce"]
};
</script>

<style>
  #enonce {
    margin: 10px;
    padding: 20px;
    border: 2px solid black;
    border-radius: 20px; 
    background-color: #2d2d2d;
  }

  .enonce {
    font-style: italic;
    font-size: 1.2em;
    color: lightgrey;
  }

  .titre {
    text-align: center;
    color: grey
  }
  

</style>>