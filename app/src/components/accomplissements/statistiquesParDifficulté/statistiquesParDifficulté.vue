<template>
    <h1>Statistiques par difficulté</h1>
    <br>
    <br>
    <br>
    <div>
        <pie-chart width="500px" legend="right" suffix="%" :data="this.récupérerDifficulté(this.difficultésReussies)"></pie-chart>
    </div>
</template>

<script src="./statistiquesParDifficulté.js"></script>