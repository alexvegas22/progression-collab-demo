
<template>
    <div>
        <pie-chart width="500px" legend="right" suffix="%" :data="[['java',this.récupererPorcentageReussi(this.tentativesRéussies, 'java')], ['python',this.récupererPorcentageReussi(this.tentativesRéussies, 'python')]]"></pie-chart>
    </div>
</template>

<script src="./statistiquesParLangage.js"></script>
