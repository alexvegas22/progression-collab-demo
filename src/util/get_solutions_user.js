const axios = require('axios')
const URI = process.env.VUE_APP_API_URL+"/avancement/"  //URI provisoire à modifier quand il y aura une gestion de session
                                                      // /{user}/question

const get_solutions_user = (question)=> new Promise((resolve, reject)=> {
    //let token = localStorage.getItem('user-token')
    axios.get(URI+question)
        .then(res=>{
            resolve(res.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
export default get_solutions_user

