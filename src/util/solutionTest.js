const axios = require('axios');
import './commun.js'


const envoyerTentative = (langage,  code) => new Promise ((resolve, reject) => {
    axios.get({url: '{0}/tentative?langage={1}'.format(process.env.VUE_APP_API_URL, langage), data: {code: code}, method: 'POST' })
        .then(resp => {
            resolve(resp.data)
        })
        .catch(err => {
            reject(err)
        })
})
export default envoyerTentative;