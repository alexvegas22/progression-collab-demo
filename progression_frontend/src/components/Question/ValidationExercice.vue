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

    <h3 v-if="testsPassent!=null">Ta reponse est {{testsPassent ? "Bonne" : "Mauvaise" }}</h3>

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
        testsPassent:null
      }
    },
    //TODO: enlever le code de trop
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
            method: 'POST',
            data: {code: this.code}
          })
              .then((response) => {
                console.log("toto");
                this.resultats=response.data.résultats
                this.feedback_global=response.data.feedback

                //variable qui sera a false si ce ne sont pas tous les tests qui passent
                this.testsPassent = true;


                for(let unResultat of response.data.résultats){
                    if(unResultat.résultat==="false"){
                       this.testsPassent = false;
                     }
                }

              }
              , (error) => {
                console.log(error)
              })
        })
      },
    }

  }
</script>
