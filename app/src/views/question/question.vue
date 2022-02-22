<template>
  <div>
    <div v-if="user">
      <Présentation v-if="démo" présentation_étape="00" />
    </div>
    <div class="container-fluid">
      <div class="row" v-if="avancement">
        <div class="col-lg-4 col-md-6 barre-enonce" 
            :style="{width: enonceCacher ? '70px' : ''}"
          >
          <Enonce présentation_étape="0" @cacherEnoncer="cacherEnoncer()" :enoncerCacher="enonceCacher"/>
        </div>
        
        <div class="col-lg-8 col-md-6 flex-column fill-height">
          <div class="col-12 flex-column" style="flex: 1 1 auto;">
            <Avancement présentation_étape="2" />
            <div class="flex-column fill-height" v-if="tentative">
              <EditeurCode présentation_étape="1" />
              <RetroactionTentative présentation_étape="3" />
            </div>
          </div>
          <div class="col-12">
            <JeuTests présentation_étape="4" class="p-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>
