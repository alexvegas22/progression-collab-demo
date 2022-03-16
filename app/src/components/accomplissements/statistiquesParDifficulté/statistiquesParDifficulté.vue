<template>
    <div>
        <pie-chart :data="[['base',this.récupererPorcentageReussi(this.difficultésReussies, 'base')]]"></pie-chart>
    </div>
</template>

<script src="./statistiquesParDifficulté.js"></script>