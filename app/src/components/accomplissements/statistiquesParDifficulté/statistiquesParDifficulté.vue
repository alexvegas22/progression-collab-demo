<template>
    <div>
        <pie-chart :data="[['base',this.récupererPorcentageReussi(this.difficultésReussies, 'base')],
        ['intermédiaire',this.récupererPorcentageReussi(this.difficultésReussies, 'intermédiaire')],
        ['défi',this.récupererPorcentageReussi(this.difficultésReussies, 'défi')]]"></pie-chart>
    </div>
</template>

<script src="./statistiquesParDifficulté.js"></script>