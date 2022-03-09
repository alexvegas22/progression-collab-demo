
<template>
<div v-if="this.tentativesRéussies">
    <div class="container">
    <br><h1> Statistiques exercices réussis </h1><br>
        <table class="table">
            <thead>
                <tr>
                    <th>Langage</th>
                    <th>Nombre d'exercices réussis</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(nombre, langage) in this.tentativesRéussies">
                    <td>{{ langage }}</td>
                    <td>{{ nombre }}</td>             
                    </tr>
            </tbody>
        </table>
    </div>
</div>

<div id="bar-1" class="bar-main-container azure">
    <div class="wrap">
      <div class="bar-percentage" data-percentage="38"></div>
      <div class="bar-container">
        <div class="bar"></div>
      </div>
    </div>
</div>


<div >
<pie-chart :data="[['java',this.tentativesRéussies['java']], ['python',this.tentativesRéussies['python']]]"></pie-chart>
</div>

</template>

<script src="./statistiquesParLangage.js"></script>
