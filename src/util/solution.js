import './commun.js'

const axios = require('axios');
const URI_BASE = process.env.VUE_APP_API_URL

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
  axios({url: '{0}/tentative?langage={1}'.format(URI_BASE, langage), data: {code: code}, method: 'POST' })
  .then(resp => {
    resolve(resp.data)
  })
  .catch(err => {
    reject(err)
  })
})

const getData = (lien) => new Promise ((resolve, reject) => {
  axios({url: lien, method: 'GET' })
  .then(reponse => {
    resolve(reponse.data.data)
  })
  .catch(err => {
    reject(err)
  })
})

export { getEbauche, getRetroaction, envoyerTentative , getData};
