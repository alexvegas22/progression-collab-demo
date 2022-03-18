<template>

    <div v-for="(nombreRéussi, langage) in this.tentativesRéussies">
        <pie-chart width="500px" legend="right" suffix="%" :data="[[langage, this.récupérerPourcentageRéussi(this.tentativesRéussies, langage)]]"></pie-chart>
    </div>
    
    <br><br><h2>{{$t('accomplissements.titreGraphParLangage')}}</h2><br>
        <div>
            <pie-chart width="500px" legend="right" suffix="%" :data="[['java',this.récupérerPourcentageRéussi(this.tentativesRéussies, 'java')], ['python',this.récupérerPourcentageRéussi(this.tentativesRéussies, 'python')]]"></pie-chart>
        </div>
</template>

<script src="./statistiquesParLangage.js"></script>
