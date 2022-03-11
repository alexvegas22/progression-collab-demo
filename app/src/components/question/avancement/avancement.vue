<template>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="testeurite" data-bs-toggle="dropdown" aria-expanded="false">
      Langues
    </a>
    <ul class="dropdown-menu" aria-labelledby="testeurite" :class="{thème_sombre: thèmeSombre}">
      <li class="dropdown-item dropdown-submenu" v-for="langage in langages" :key="langage">
        <a>{{langage}}</a>
        <div class="dropdown-menu" :class="{thème_sombre: thèmeSombre}" style="max-height:">
          <button class="dropdown-item" @click="this.reinitialiserCodeEditeur(langage)">{{ $t('avancement.ébauche_initiale') }}</button>
          <button class="dropdown-item" v-for="elem in this.filtrerTentativesParLangage(langage)" @click="this.chargerTentative()" :value="elem.liens.self">
            {{ this.timestampVersDate(elem.date_soumission) }} {{ elem.réussi ? "  &#9989;" : "  &#10060;" }}
          </button>
        </div>
      </li>
    </ul>
  </li>
</template>

<script src="./avancement.js"></script>

