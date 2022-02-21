
<template>
<div v-if="avancements">
    <h1> Liste d'exercices </h1><br>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th>Exercice</th>
                    <th>Difficulté</th>
                    <th>État</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="avancement in avancements" :key="avancement.id">
                                                 
                        <td></td>
                        <td></td>
                        <td>{{ étatVersChaîne(avancement.état)}}</td>
                        <td></td>
                    </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<style src="./tableauExercices.css"></style>
<script src="./tableauExercices.js"></script>
