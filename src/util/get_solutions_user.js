const axios = require('axios')
const URI_BASE = process.env.VUE_APP_API_URL  //URI provisoire à modifier quand il y aura une gestion de session
                                                      // user/{username}/

const get_solutions_user = (lien)=> new Promise((resolve, reject)=> {
    //let token = localStorage.getItem('user-token')
    console.log(URI_BASE+lien)
    axios.get(URI_BASE+lien)
        .then(res=>{
            resolve(res.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
export default get_solutions_user

