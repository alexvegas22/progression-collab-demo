<template>
    <div id="ListeTests" v-for="t in tests" :key="t">
        <li><Test v-bind:test="t"/></li>
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
            type:Array
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
  },
}
</script>