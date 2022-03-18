<template>
    <h1>Statistiques par difficulté</h1>
    <br>
    <br>
    <br>
    <div>
        <pie-chart width="500px" legend="right" suffix="%" :data="[
        ['base',this.récupererPorcentageReussi(this.difficultésReussies, 'base')],
        ['intermédiaire',this.récupererPorcentageReussi(this.difficultésReussies, 'intermédiaire')],
        ['défi',this.récupererPorcentageReussi(this.difficultésReussies, 'défi')]]"></pie-chart>
    </div>
</template>

<script src="./statistiquesParDifficulté.js"></script>