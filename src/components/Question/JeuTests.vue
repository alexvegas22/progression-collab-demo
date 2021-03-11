<template>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <h1 style="text-align: center;">Jeu de tests</h1>
    <div v-for="test in tests" :key="test">
        <div v-on:click="test.visible = !test.visible" class="container">
            <div class ="d-flex flex-row p-2">
                <div class="align-content-start p-2">
                    <span style="font-size:200%;">
                        &#10148;
                    </span>
                </div>
                <div class="flex-grow-1">
                <div class ="d-flex p-2 .flex-row border">
                    <p class="p-2">{{test.nom}}</p>
                    <div class="ml-auto">
                      <span style="font-size:200%;" v-if="test.resultat">
                          &#9989;
                      </span>
                      <span style="font-size:200%;" v-else>
                          &#10060;
                      </span>
                    </div>
                </div>
                </div>
                <div class="p-2 align-content-xl-end">
                    <button class="btn btn-secondary" disabled>&#10148; Lancer Le test</button>
                </div>
            </div>
            <div class="row">
                <Test v-if="test.visible" v-bind="test"/>
            </div>
        </div>
    </div>
</template>
<script>
import Test from './Test.vue'
export default {
  components: { Test },
    name: "JeuTests",

    props:{
        tests:{
            required:true,
        }
    },
    watch: {
       tests: function () {
         this.texteTests = this.tests
    }
  },

  data(){
    return{
      texteTests:this.tests
    }
  }
}
</script>
