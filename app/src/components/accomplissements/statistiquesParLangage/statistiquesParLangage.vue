<template>    
    <h1>Statistiques des exercices réussis par langage</h1>
    <br>      
    <div>            
        <pie-chart width="500px" legend="right" suffix="%" :data="
                                                                [['java',this.récupérerPourcentageRéussi(this.tentativesRéussies, 'java')], 
                                                                ['python',this.récupérerPourcentageRéussi(this.tentativesRéussies, 'python')]]"></pie-chart>        
    </div>
</template>

<script src="./statistiquesParLangage.js"></script>
