const axios = require('axios');
import './commun.js';

const getEbauche = (categorie, nom, titre, langage) => new Promise ((resolve, reject) => {
  axios({url: '{0}/question/{1}/{2}/{3}/solution?langage={4}'.format(process.env.VUE_APP_API_URL, categorie, nom, titre, langage), method: 'GET' })
  .then(resp => {
    resolve(resp.data.Solution.code)
  })
  .catch(err => {
    reject(err)
  })
})

const getRetroaction = () => new Promise ((resolve, reject) => {
  axios({url: process.env.VUE_APP_API_URL_RETROACTION, data: {code: 'voici mon code'}, method: 'POST' })
  .then(resp => {
    resolve(resp.data.included[0].attributes2.feedback)
  })
  .catch(err => {
    reject(err)
  })
})

const envoyerTentative = (langage,  code) => new Promise ((resolve, reject) => {
  axios({url: '{0}/tentative?langage={1}'.format(process.env.VUE_APP_API_URL, langage), data: {code: code}, method: 'POST' })
  .then(resp => {
    resolve(resp.data)
  })
  .catch(err => {
    reject(err)
  })
})

export { getEbauche, getRetroaction, envoyerTentative };
