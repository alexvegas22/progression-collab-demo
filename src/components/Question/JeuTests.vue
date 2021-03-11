<template>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <h1 style="text-align: center;">Jeu de tests</h1>
    <div v-for="test in tests">
        <div v-on:click="test.visible = !test.visible" class="container">
            <div class ="row">
                <div>
                    &#10148;
                </div>
                <div class ="col-md-8 row">
                  <p>{{test.nom}}</p>
                  <span  v-if="test.resultat">
                    &#9989;
                  </span>
                  <span v-else>
                    &#10060;
                  </span>
                </div>
                <div>
                    <button disabled>&#10148; Lancer Le test</button>
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


  data(){
    return{
        tests : [
            {
                nom: 'test1',
                resultat: true,
                visible: false
            },
            {
                nom: 'test2',
                resultat:false,
                visible:false
            }
        ],
    }
  }
}
</script>
