const axios = require('axios');
const BASE_URL = process.env.VUE_APP_API_URL // json-server

const get_question = (catégorie, nom, titre, langage) => new Promise ((resolve, reject) => {
    axios({ url: BASE_URL + '/question', method: 'GET' }) // json-server
    .then( response => {
        resolve(response .data)
    })
    .catch(err => {
        reject(err)
    })
})

export default get_question;
