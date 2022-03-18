<template>    
    <h1>Statistiques des exercices réussis par langage</h1>        
    <div>            
        <pie-chart width="500px" legend="right" suffix="%" :data="this.récupérerLangage(this.tentativesRéussies)"></pie-chart>        
    </div>
</template>

<script src="./statistiquesParLangage.js"></script>
