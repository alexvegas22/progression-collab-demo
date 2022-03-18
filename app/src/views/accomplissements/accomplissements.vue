<template>
    <h1> {{ $t('accomplissements.titrePage') }} </h1>
    <br>
    <div class="accomplissementContainer">
        <div class="accomplissementItem">
            <tableauExercices />
        </div>
        <div class="accomplissementItem">
            <graphiqueStatistiques />
        </div>
    </div>
</template>

<script src="./accomplissements.js"></script>
<style src="../../css/mainMenu.css"></style>
<style src="./accomplissements.css"></style>