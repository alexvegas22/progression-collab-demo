<template>
  <div>
    <div v-bind:key="solution.date_soumission" v-for="solution in solutions">
      <a v-on:click="afficherSolution(solution.date_soumission)">Solution du {{convetirDateDepuisTimeStamp(solution.date_soumission)}} </a>
    </div>
    <Solution v-if="idSolutionEnCoursVisionement" v-bind:id-solution=idSolutionEnCoursVisionement></Solution>
  </div>


</template>

<script>

import Solution from "@/components/Solution";
export default {
  name:"Solutions",
  components: {Solution},
  props:{
    solutions:Array,
  },
  data(){
    return {idSolutionEnCoursVisionement:""}
  },
  methods:{
    convetirDateDepuisTimeStamp : function (timestanp) {
      return new Date(timestanp*1000)
    },
    afficherSolution(id){
      this.idSolutionEnCoursVisionement =id
    }
  }
}


</script>