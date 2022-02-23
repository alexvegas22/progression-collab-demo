
<template>
<div v-if="avancements">
    <h1> Liste d'exercices </h1><br>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th>Langage</th>
                    <th>Nombre d'exercices réussis</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="avancement in avancements" :key="avancement.id">

                        <td>{{avancement.titre}}</td>
                        <td>{{ compteurRéussi(avancement.état)}}</td>       
                    </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<style src="./tableauExercices.css"></style>
<script src="./tableauExercices.js"></script>
