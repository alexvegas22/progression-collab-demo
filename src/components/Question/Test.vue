<template>
    <div>
        <!--<ValidationTentative />-->

        {{texteUnTest}}

    </div>
  <div class="container">
    <div class="row">
      <div class="bg-light col card device-card">
        <div class="card-body">
          <h5 class="text-black-50 font-weight-bold text-center card-title">Entrée</h5>
          <p class="card-text">1</p>
        </div>
      </div>

      <div class="bg-light col card device-card">
        <div class="card-body">
          <h5 class="text-black-50 font-weight-bold text-center card-title">Sortie attendue</h5>
          <p class="card-text">Bonjour le monde!</p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="bg-light col card device-card">
        <div class="card-body">
          <h5 class="text-danger font-weight-bold text-center card-title">Sortie erreur</h5>
          <p class="card-text">x is not defined in the current context</p>
        </div>
      </div>

      <div class="bg-light col card device-card">
        <div class="card-body">
          <h5 class="text-black-50 font-weight-bold text-center card-title">Sortie console</h5>
          <p class="card-text">Salutation salutation</p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="bg-light col card device-card">
        <div class="card-body">
          <h5 class="text-black-50 font-weight-bold text-center card-title">Feedback</h5>
          <p class="card-text">Salutation salutation</p>
        </div>
      </div>
    </div>
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