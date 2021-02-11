const axios = require("axios")

const potser = (ennonce) => new Promise((resolve, reject)=> {
    //let token = localStorage.getItem('user-token')
    axios.post('',{
        blabla: ennonce.blabla,
        toto: ennonce.toto
    })
        .then(res=>{
            resolve(res.data)
        })
        .catch(error=>{
            reject(error)
        })
})