

<template>
    <div v-if="avancements">
        <h1> Liste d'exercices </h1>
        <br>
        <div>
            <input type="text" v-model="inputFilter" class="form-control barRecherhe">
        </div>
        <br>
        <div>
            <V-table :data="this.filtreAvancement" class="table">
                <template #head>
                    <V-th id="tglTitre" class="!triTh" sortKey="titre" @click="styleTh('tglTitre')">Titre de l'exercice</V-th>
                    <V-th id="tglNiveau" class="!triTh" sortKey="niveau" @click="styleTh('tglNiveau')">Difficulté</V-th>
                    <V-th id="tglDateM" class="!triTh" sortKey="date_modification" @click="styleTh('tglDateM')">Date de dernière tentative</V-th>
                    <V-th id="tglDateR" class="!triTh" sortKey="date_réussite" @click="styleTh('tglDateR')">Date de réussite</V-th>
                </template>
                <template #body="{ rows }">
                    <tr @click="allerVersQuestion(avancement.liens.self)" v-for="avancement in rows" :key="avancement.titre" class="lienQuestion">
                        <td>{{avancement.titre}}</td>
                        <td>{{afficherNiveau(avancement.niveau)}}</td>
                        <td>{{timestampVersDate(avancement.date_modification)}}</td>
                        <td>{{timestampVersDate(avancement.date_réussite)}}</td>
                    </tr>
                </template>
            </V-table>
        </div>
    </div>
</template>

<style src="./tableauExercices.css"></style>
<script src="./tableauExercices.js"></script>
