<template>
  <div>
    <h1>Valide ton code</h1>
    <form>
      <textarea v-model="code"></textarea>
    </form>
  </div>
  <div>
    <p>ton code est {{code}}</p>
    <ul v-for="unResultat in resultats" :key="unResultat">
      <li>
        resultat: {{unResultat.résultat}}
      </li>
      <li>
        sortie d'erreur: {{unResultat.sortie_erreur}}
      </li>
      <li>
        sortie observée: {{unResultat.sortie_observée}}
      </li>
      <li>
       feedback: {{unResultat.feedback}}
      </li>
    </ul>

    <button @click="valider_tentative">envoie ta reponse</button>

    <h4 v-if="feedback_global">Feedback global: {{feedback_global}}</h4>
    <h3 v-if="bonne_rep">{{bonne_rep==="true" ? "bonne":"mauvaise"}}</h3>
      <!--h3 v-if="verifier_bonne_reponse">Ta reponse est:Bonne</h3>
      <h3 v-else>Ta reponse est:Mauvaise</h3-->
  </div>
</template>

<script>
  export default{
    props: ['language'],
    data() {
      return {
        name:'ValidationExercice',
        code : '',
        resultats:[],
        feedback_global:'',
        bonne_rep:null
      }
    },

    methods: {
      valider_tentative(){
        const AXIOS = require('axios');
        const ENTRY_POINT = 'http://localhost:3000/'
        new Promise((resolve, reject) => {

          // url pattern is based on api doc example
          let url = ENTRY_POINT+"tentative?langage=" + this.language

          AXIOS({
            //TODO le faire avec un post, il faudra peut-être un middleware,pas si facile avec json-server
            url: url,
            method: 'GET',
            data: {code: this.code}
          })
              .then((response) => {
                console.log(response);
                this.resultats=response.data.résultats
                this.feedback_global=response.data.feedback
                this.verifier_bonne_reponse()
              }
              , (error) => {
                console.log(error)
              })
        })
      },

      //TODO trouver comment regler le probleme pour definir la bonne reponse
      verifier_bonne_reponse(){
        for(let unResult in this.resultats){
          console.log(this.resultats)
          console.log(JSON.parse)
          if(unResult.résultat==="false"){
            return "false";
          }
        }
        return "true";
      }
    }

  }
</script>
