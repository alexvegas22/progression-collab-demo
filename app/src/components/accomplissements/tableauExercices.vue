<template>
    <div v-if="avancements">
        <h1> Liste d'exercices </h1>

        <div class="container-fluid">
            <input type="text" v-model="inputFilter" class="form-control">
            <table class="table">
                <thead>
                    <tr >
                        <th >Titre de l'exercice </th>
                        <th >Difficulté </th>
                        <th >Date de dernière modification <i type="button" @click="this.ordreModification(); this.$forceUpdate();" class="arrow"></i></th>
                        <th >État </th>
                        <th >Date de réussite <i type="button" @click="this.ordreReussite(); this.$forceUpdate();" class="arrow"></i></th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="avancement in filtreAvancement" :key="avancement.titre">

                        <td @click="this.allerQuestion(avancement.id)">{{avancement.titre}}</td>
                        <td>{{avancement.niveau}}</td>
                        <td>{{timestampVersDate(avancement.date_modification)}}</td>
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
