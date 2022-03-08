
<template>
<div v-if="this.tentativesRéussies">
    <div class="container">
    <br><h1> Statistiques exercices réussis </h1><br>
        <table class="table">
            <thead>
                <tr>
                    <th>Langage</th>
                    <th>Nombre d'exercices réussis</th>
                    <th>Porcentage</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(nombre, langage) in this.tentativesRéussies">
                    <td>{{ langage }}</td>
                    <td>{{ nombre }}</td>  
                    <td>{{ this.récupererPorcentageReussi(this.tentativesRéussies, langage) }}%</td>           
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script src="./statistiquesParLangage.js"></script>
