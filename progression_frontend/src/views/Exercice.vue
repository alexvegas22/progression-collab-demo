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
       feedback: {{unResultat.sortie_observée}}
      </li>
    </ul>

    <button @click="valider_tentative">envoie ta reponse</button>

    <h3 v-if="feedback_global">Feedback global: {{feedback_global}}</h3>
  </div>
</template>

<script>
  export default{
    props: ['language'],
    data() {
      return {
        name:'Exercice',
        code : '',
        resultats:[],
        feedback_global:''
      }
    },

    methods: {
      valider_tentative(){
        const AXIOS = require('axios');
        const ENTRY_POINT = 'adresse du mock json server'
        new Promise((resolve, reject) => {

          // url pattern is based on api doc example
          let url = "http://localhost:3000/tentative?langage=" + this.language

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
              }, (error) => {
                console.log(error)
              })
        })

      }
    }

  }
</script>
