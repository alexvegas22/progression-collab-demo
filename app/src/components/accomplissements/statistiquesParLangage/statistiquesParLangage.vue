
<template>
    <div>
        <pie-chart :data="[['java',this.récupererPorcentageReussi(this.tentativesRéussies, 'java')], ['python',this.récupererPorcentageReussi(this.tentativesRéussies, 'python')]]"></pie-chart>
    </div>
</template>

<script src="./statistiquesParLangage.js"></script>
