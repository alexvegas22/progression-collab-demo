<template>
    <div>
        <li><Test v-bind="test"/></li>
        {{texteTests}}
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
         this.texteTests = this.tests[0]
    }
  },

  data(){
    return{
      texteTests:this.tests[0]
    }
  },
}
</script>