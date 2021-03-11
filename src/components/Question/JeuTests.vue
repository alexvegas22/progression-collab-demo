<template>
    <div>
        <li><Test v-bind="tests"/></li>
    </div>
</template>
<script>
import Test from './Test.vue'
export default {
  components: { Test },
    name: "JeuTests",

    props:{
        tests:{
            required:true
        }
    },
    watch: {
       tests: function () {
         //this.texteFeedBack = this.tests
    }
  },

  data(){
    return{
      //TODO ajouter la methode pour obtenir les tests
    }
  },
}
</script>