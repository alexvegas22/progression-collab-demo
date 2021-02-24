<template>
  <div  id="Retroaction">
    <h1 style="margin: 0;">Rétroaction</h1>
    <div v-if="texteFeedBack != null" id="Retroaction-principale">
        <h3>{{texteFeedBack}}</h3>
    </div>
  </div>
</template>

<script>

export default {
  name: "Feedback",

  props: {
    feedBack: {
      required: true
    }
  },

  watch: {
       feedBack: function () {
         this.texteFeedBack = this.feedBack
    }
  },

  data(){
    return{
      texteFeedBack:this.feedBack
    }
  },
};
</script>
