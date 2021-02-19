const axios = require('axios')
const URI_BASE = process.env.VUE_APP_API_URL  //URI provisoire à modifier quand il y aura une gestion de session
                                                      // user/{username}/

const get_api_response = (lien)=> new Promise((resolve, reject)=> {
    //let token = localStorage.getItem('user-token')
    axios.get(URI_BASE+lien)
        .then(res=>{
            resolve(res.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
export default get_api_response

