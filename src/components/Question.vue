<template>
  <div id="question">
    <h1>Question</h1>
    <button v-on:click="obtenirUneQuestion">Obtenir une question</button>
    <h2>{{ enonce }}</h2>
  </div>
</template>
