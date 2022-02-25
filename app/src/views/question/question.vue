<template>
  <div>
    <div v-if="user">
      <Présentation v-if="démo" présentation_étape="00" />
    </div>
    <div class="container-fluid taille-ecran">
      <div class="row h-100" v-if="avancement">
        <div class="col-lg-4 col-md-6 barre-enonce" 
            :style="{width: enonceCacher ? '50px' : ''}"
          >
          <Enonce présentation_étape="0" @cacherEnoncer="cacherEnoncer()" :enoncerCacher="enonceCacher"/>
        </div>
        
        <div class="col-lg-8 col-md-6 flex-column fill-height h-100 p-0" style="padding-left:0;">
          <div class="col-12 flex-column fill-height m-n-0" style="flex: 1 1 auto;">
            <Avancement présentation_étape="2" style="flex: 0 0 auto;"/>
            <div class="flex-column overflow-hidden" style="flex: 1 1 auto;" v-if="tentative">
              <EditeurCode présentation_étape="1" class="flex-grow-1 m-n-0"/>
              <RetroactionTentative présentation_étape="3" />
            </div>
          </div>
          <div class="col-12">
            <onglets-information présentation_étape="4"></onglets-information>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>
