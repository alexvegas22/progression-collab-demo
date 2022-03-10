<template>
  <div>
    <div v-if="user">
      <Présentation v-if="démo" présentation_étape="00" />
    </div>
    <BarreNavigation v-if="avancement"/>

    <div class="container-fluid taille-ecran">
      <div class="row h-100" v-if="avancement">
        <div 
          class="barre-enonce" 
          v-show="énoncéPleinÉcran || énoncéSemiÉcran" 
          :class="{'col-lg-4': énoncéSemiÉcran, 'col-md-6': énoncéSemiÉcran, 'col-12': énoncéPleinÉcran}">
          <Enonce présentation_étape="0"/>
        </div>
        
        <div class="col-lg-8 col-md-6 flex-column fill-height h-100 p-0" v-show="!énoncéPleinÉcran" style="padding-left:0;">
          <div class="col-12 flex-column fill-height m-n-0" style="flex: 1 1 auto;">
            <div class="flex-column overflow-hidden" style="flex: 1 1 auto;" v-if="tentative">
              <EditeurCode présentation_étape="1" class="flex-grow-1 m-n-0"/>
              <RetroactionTentative présentation_étape="3" />
            </div>
          </div>
          <div class="col-12">
            <onglets-information :afficherPanneau="afficherPanneau" présentation_étape="4"></onglets-information>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./question.js"></script>

<style src="./question.css"></style>
