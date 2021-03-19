<template>
  <div class="container">
    <div class="err">4</div>
    <!-- purple x moss 2020 -->
    <!--source: https://codepen.io/purplexmoss-->
    <i class="far fa-question-circle fa-spin"></i>
    <div class="err2">4</div>
    <div class="msg">
      <h3>Peut être que cette page n'existe pas? Supprimée par accident? Possiblement en quarantaine? Allons à la <a href="#">Page d'accueil</a> </h3>
    </div>
  </div>

</template>

<script>
export default {
  name: "404NotFound"
}
</script>

<style scoped>
.err {
  color: #1e87f0;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 11rem;
  position:absolute;
  left: 20%;
  top: 8%;
}
.far {
  position: absolute;
  font-size: 8.5rem;
  left: 42%;
  top: 15%;
  color: #1e87f0;
}

.err2 {
  color: #1e87f0;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 11rem;
  position:absolute;
  left: 68%;
  top: 8%;
}

.msg {
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.6rem;
  position:absolute;
  left: 16%;
  top: 45%;
  width: 75%;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>