<template>
  <div v-if="avancement.état">
    <h3>La question est {{ convetirEtatEnString(avancement.état) }}</h3>
    <div v-if="avancement.état === 0">
      <p>Aucune tentative précédente</p>
    </div>
    <div v-else>
      <label for="avancement">Version de la solution:</label>
      <select name="avancement" id="avancement">
        <option disabled selected>Choisir une tentative précédente</option>
        <option
          v-bind:key="tentative.date_soumission"
          v-for="tentative in tentatives"
          v-on:click="
            chargerTentative(
              avancement.lienTentatives + '' + tentative.date_soumission
            )
          "
          value="{{tentative.date_soumission}}"
        >
          Tentative du
          {{ convetirDateDepuisTimeStamp(tentative.date_soumission) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Avancement",
  computed: {
    avancement() {
      return this.$store.state.avancement;
    },
    tentatives() {
      return this.$store.state.avancement.tentatives;
    },
  },
  methods: {
    chargerTentative: function (lien) {
      this.$store.dispatch("getTentative", lien)
    },
    convetirDateDepuisTimeStamp: function (timestamp) {
      let date = new Date(timestamp * 1000);
      return date.toLocaleString("fr-CA");
    },
    convetirEtatEnString: function (etat) {
      let etatString;
      switch (etat) {
        case 0:
          etatString = "DÉBUT";
          break;
        case 1:
          etatString = "NON-RÉUSSI";
          break;
        case 2:
          etatString = "RÉUSSI";
          break;
        default:
          etatString = "Vers l'infini et au delà";
      }
      return etatString;
    },
  },
};
</script>