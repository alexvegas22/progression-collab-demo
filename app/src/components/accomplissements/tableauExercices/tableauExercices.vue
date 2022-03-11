

<template>
    <div v-if="avancements">
        <h1> Liste d'exercices </h1>
        <br>
        <div class="container">
            <V-table :data="this.listeAvancements" class="table">
                <template #head>
                    <V-th sortKey="titre">Titre de l'exercice</V-th>
                    <V-th sortKey="niveau">Difficulté</V-th>
                    <V-th sortKey="date_modification">Date de dernière modification</V-th>
                    <V-th sortKey="état">État</V-th>
                    <V-th sortKey="date_réussite">Date de réussite</V-th>
                </template>
                <template #body="{ rows }">
                    <tr v-for="avancement in rows" :key="avancement.titre">
                        <td class="lienQuestion" @click="allerVersQuestion(avancement.liens.self)">{{avancement.titre}}</td>
                        <td>{{afficherNiveau(avancement.niveau)}}</td>
                        <td>{{timestampVersDate(avancement.date_modification)}}</td>
                        <td>{{ afficherEtat(avancement.état)}}</td>
                        <td>{{timestampVersDate(avancement.date_réussite)}}</td>
                    </tr>
                </template>
            </V-table>
        </div>
    </div>
</template>

<style src="./tableauExercices.css"></style>
<script src="./tableauExercices.js"></script>
