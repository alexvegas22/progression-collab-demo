<template>
  <div>
    <div v-bind:key="solution.date_soumission" v-for="solution in solutions">
      <a v-on:click="afficherSolution(solution.date_soumission)">Solution du {{convetirDateDepuisTimeStamp(solution.date_soumission)}} </a>
    </div>
    <Solution v-if="solution!==null" v-bind:solution="solution"></Solution>
  </div>

</template>

<script>

import Solution from "@/components/Solution";
import get_solution from '../util/solution'
export default {
  name:"Solutions",
  components: {Solution},
  props:{
    solutions:Array,
  },
  data(){
    return {
      solution:null
    }
  },
  methods:{
    convetirDateDepuisTimeStamp : function (timestanp) {
      return new Date(timestanp*1000)
    },
    afficherSolution(id){

      get_solution(id)
          .then(
              response=>{
                this.solution = response
              })
          .catch(err=>{
            this.erreurs = err;
          });
    }
  }
}


</script>