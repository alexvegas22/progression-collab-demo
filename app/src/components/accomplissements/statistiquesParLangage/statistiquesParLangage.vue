
<template>
    <br>
    <div>
        <pie-chart :data="[['java',this.récupererPorcentageReussi(this.tentativesRéussies, 'java')], ['python',this.récupererPorcentageReussi(this.tentativesRéussies, 'python')]]"></pie-chart>
    </div>
    <br>
</template>

<script src="./statistiquesParLangage.js"></script>
