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
          <p class="card-text">{{sortie_erreur}}</p>
        </div>
      </div>

      <div class="bg-light col card device-card">
        <div class="card-body">
          <h5 class="text-black-50 font-weight-bold text-center card-title">
            Sortie console
          </h5>
          <p class="card-text">{{sortie_console}}</p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="bg-light col card device-card">
        <div class="card-body">
          <h5 class="text-black-50 font-weight-bold text-center card-title">
            Feedback
          </h5>
          <p class="card-text">{{feedback}}</p>
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
    resultat: {
			required: true,
		},
  },
  data() {
    return{
      sortie_attendue: this.test.sortie_attendue,
      entree: this.test.entrée,
      sortie_erreur: this.resultat.sortie_erreur ?? "",
      sortie_console: this.resultat.sortie_observée ?? "",
      feedback: this.resultat.feedback ?? "",
    }
  },
  /*watch:{
    ebaucheTest: function(){
      this.sortie_attendue =this.test.sortie_attendue;
      this.entree = this.test.entrée;
    }
  }*/
}
</script>>