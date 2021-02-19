<template>

  <div>
    <h1 v-if="état!=null">La question <strong>{{question.id}}</strong> est {{convetirEtatEnString(état)}}</h1>
  </div>

</template>

<script>
export default {
  name: "Avancement",
  props: {
    état:Number,
    question:String
  },
  methods: {
    convetirEtatEnString: function (etat) {
      let etatString
      switch (etat){

        case 0:
          etatString="DÉBUT"
          break;
        case 1:
          etatString="NON-RÉUSSI"
          break;
        case 2:
          etatString="RÉUSSI"
          break;
        default:
          etatString ="Vers l'infini et au delà"
      }
      return etatString
    }
  }
}
</script>