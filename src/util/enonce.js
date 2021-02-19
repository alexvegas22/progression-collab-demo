const axios = require('axios');
import './commun.js'

const getEnonce = () => new Promise ((resolve, reject) => {
  axios({url: '{0}/api/v1/question/2?include=Tests'.format(process.env.VUE_APP_API_URL), method: 'GET' })
  .then(resp => {
    resolve(resp.data.data.attributes.énoncé)
  })
  .catch(err => {
    reject(err)
  })
})

export { getEnonce }
