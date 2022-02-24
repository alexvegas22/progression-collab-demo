
<template>
<div v-if="avancements">
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
                    <tr>
                        <td>Python</td>
                        <td>{{ this.récupérerTentativesPython() }}</td>     
                    </tr>
    
                    <tr>
                        <td>Java</td>
                        <td>{{ this.récupérerTentativesJava() }}</td>       
                    </tr>

                    
            </tbody>
        </table>
    </div>
</div>
</template>


<script src="./statistiquesTypesQuestions.js"></script>
