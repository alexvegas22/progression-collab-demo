<template>
  <div class="container">
    <div class="row">
      <div class="bg-light col card device-card">
        <div class="card-body">
          <h5 class="text-black-50 font-weight-bold text-center card-title">
            Entrée
          </h5>
          <p class="card-text">{{entree}}</p>
        </div>
      </div>

      <div class="bg-light col card device-card">
        <div class="card-body">
          <h5 class="text-black-50 font-weight-bold text-center card-title">
            Sortie Attendue
          </h5>
          <p class="card-text">{{sortie_attendue}}</p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="bg-light col card device-card">
        <div class="card-body">
          <h5 class="text-danger font-weight-bold text-center card-title">
            Sortie erreur
          </h5>
          <p class="card-text">x is not defined in the current context</p>
        </div>
      </div>

      <div class="bg-light col card device-card">
        <div class="card-body">
          <h5 class="text-black-50 font-weight-bold text-center card-title">
            Sortie console
          </h5>
          <p class="card-text">Salutation salutation</p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="bg-light col card device-card">
        <div class="card-body">
          <h5 class="text-black-50 font-weight-bold text-center card-title">
            Feedback
          </h5>
          <p class="card-text">Salutation salutation</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Resultat",
  props: {
    test:{
      required:true,
    },
  },
  data() {
    return{
      sortie_attendue: this.test.attributes.sortie_attendue,
      entree: this.test.attributes.entrée
    }
  },
  watch:{
    ebaucheTest: function(){
      this.sortie_attendue =this.test.attributes.sortie_attendue;
      this.entree = this.test.attributes.entrée;
    }
  }
}
</script>>