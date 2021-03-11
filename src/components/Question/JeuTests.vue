<template>
    <h1>Jeu de tests</h1>
    <div v-for="test in tests">
        <div v-on:click="test.visible = !test.visible">
            <p>{{test.nom}}</p>
            <h1 v-if="test.resultat">test</h1>
            <h1 v-else>pas test</h1>
            <Test v-if="test.visible" v-bind="test"/>
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
