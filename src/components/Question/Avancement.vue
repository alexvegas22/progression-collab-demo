<template>

  <div>
    <h1 v-if="état!=null">La question est {{convetirEtatEnString(avancement.état)}}</h1>

    <label for="avancement">Version de la solution:</label>
    <select name="avancement" id="avancement" v-bind:key="tentative.date_soumission" v-for="tentative in tentatives">
      <option v-on:click="getTentative(tentative)" value="{{tentative.date_soumission}}">{{convetirDateDepuisTimeStamp(tentative.date_soumission)}}</option>
    </select>

  </div>

</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Avancement",
  props: {
    questionAvancement:String
  },
  computed: {
    avancement () {
      return this.$store.state.avancement
    }
  },
  methods: {
    ...mapActions([
      'getTentative'
    ]),
    convetirDateDepuisTimeStamp : function (timestanp) {
        let date = new Date(timestanp*1000)
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`
      },
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
  },
  mounted() {
    this.$store.dispatch('getAvancement', questionAvancement)
  }

}
</script>