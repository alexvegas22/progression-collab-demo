<template>
    <div>
        <!--<ValidationTentative />-->
        {{texteUnTest}}
    </div>
</template>
<script>
import ValidationTentative from './ValidationTentative.vue'
export default {
  components: { ValidationTentative },
    name:"Test",
    props:{
        test:{
            required:true
        }
    },
    watch:{
        test: function(){
            this.texteUnTest = this.test
        }
    },
    data(){
        return{
            texteUnTest:this.test
        }
    }
};
</script>