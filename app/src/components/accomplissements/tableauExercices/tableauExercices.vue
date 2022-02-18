<template>
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
            <!--<tbody v-for="elem in this.tentatives()"> -->
            <tbody>
                    <tr>
                        <!-- <td href = {{question_uri()}}> {{titre()}} </td> -->
                        <td>Boucle</td>
                        <!-- {{niveau()}}-->
                        <td>Base</td>
                        <td>{{this.étatVersChaîne()}}</td>
                        <!--                          elem.date_soumission-->
                        <td>{{ this.timestampVersDate(date_soumission) }}</td>
                    </tr>
            </tbody>
        </table>
    </div>
</template>

<style src="./tableauExercices.css"></style>
<script src="./tableauExercices.js"></script>

