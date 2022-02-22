
<template>
<div v-if="avancements">
    <h1> Liste d'exercices </h1><br>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th>Titre de l'exercice</th>
                    <th>Difficulté</th>
                    <th>Date de dernière modification</th>
                    <th>État</th>
                    <th>Date de réussite</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="avancement in avancements" :key="avancement.id">

                        <td>{{avancement.titre}}</td>
                        <td>{{avancement.niveau}}</td>
                        <td>{{timestampVersDate(avancement.date_avancement)}}</td>
                        <td>{{ etat(avancement.état)}}</td>
                        <td>{{timestampVersDate(avancement.date_réussite)}}</td> 
                        
                    </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<style src="./tableauExercices.css"></style>
<script src="./tableauExercices.js"></script>
