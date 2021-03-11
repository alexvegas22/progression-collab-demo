<template>
    <div>
        <!--<ValidationTentative />-->
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
    }
}
</script>