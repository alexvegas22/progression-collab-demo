<template>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="affichage" data-bs-toggle="dropdown" aria-expanded="false">
      Affichage
    </a>
    <ul class="dropdown-menu" aria-labelledby="affichage">
      <li class="dropdown-item dropdown-submenu">
        <a>
          Afficher Énoncé
          <i class="fa fa-check" aria-hidden="true" v-if="énoncéSemiÉcran || énoncéPleinÉcran"></i>
        </a>
        <ul class="dropdown-menu" style="max-height:">
          <li @click="ajusterÉnoncé('semi')" class="dropdown-item">
            Énoncé semi-écran
            <i class="fa fa-check" aria-hidden="true" v-if="énoncéSemiÉcran"></i>
          </li>
          <li @click="ajusterÉnoncé('plein')" class="dropdown-item">
            Énoncé plein-écran
            <i class="fa fa-check" aria-hidden="true" v-if="énoncéPleinÉcran"></i>
          </li>
        </ul>
      </li>
      <li @click="ajusterPanneau" class="dropdown-item">
        Afficher Panneau
        <i class="fa fa-check" aria-hidden="true" v-if="afficherPanneau"></i>
      </li>
      <li @click="éditeurPleinÉcran" class="dropdown-item">
        Éditeur plein-écran
        <i class="fa fa-check" aria-hidden="true" v-if="!énoncéPleinÉcran && !énoncéSemiÉcran && !afficherPanneau"></i>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ['thèmeSombre'],
  computed: {
    afficherPanneau() {
      return this.$store.state.afficherPanneau;
    },
    énoncéPleinÉcran() {
      return this.$store.state.énoncéPleinÉcran;
    },
    énoncéSemiÉcran() {
      return this.$store.state.énoncéSemiÉcran;
    }
  },
  methods: {
    ajusterÉnoncé(type) {
      this.$store.dispatch('setAffichageÉnoncé', type);
    },
    ajusterPanneau() {
      this.$store.dispatch('setAffichagePanneau');
    },
    éditeurPleinÉcran() {
      this.$store.dispatch('setAffichageÉditeur');
    }
  }
}
</script>

<style>

</style>