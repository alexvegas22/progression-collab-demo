<template>
  <div v-if="avancement.état">
    <h3>{{ convetirEtatEnString(avancement.état) }}</h3>
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
              // TODO: Ne voudrait - on pas justement se débarrasser des spécifications tels que le «self»
              // TODO: Ceci m'emmène vers une autre question à savoir, quelles est la différence entre le «self» et le «related»
              // TODO: Ce lien dans l'API renvoie vers le domaine «example.com»
              tentative.liens.self
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
          etatString = "Vous en êtes à votre première tentative !";
          break;
        case 1:
          etatString = "La question n'a pas encore été résolue !";
          break;
        case 2:
          etatString = "La question a déjà été correctement résolue !";
          break;
        default:
          etatString = "La question est indéterminée !";
      }
      return etatString;
    },
  },
};
</script>
