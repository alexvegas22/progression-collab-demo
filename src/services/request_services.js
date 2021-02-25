import './commun.js'

const axios = require('axios');

/**methode pour faire une requete GET, il faut passer le lien COMPLET
VOIR la doc README.MD**/
const getData = (lien)=> new Promise((resolve, reject)=> {
    //let token = localStorage.getItem('user-token')
    axios.get(lien)
        .then(res=>{
            resolve(res.data.data)
        })
        .catch(error=>{
            reject(error)
        })
})

/**
 * Fait une requete Post a l'api
 * @param lien: Lien complet de la requete
 * @param body: le body COMPLET de la requete
 * @returns {Promise<unknown>}, a traiter a l'appel
 */
const postData = (lien, body)=> new Promise((resolve, reject)=> {
    //let token = localStorage.getItem('user-token')
    axios.post(lien, body)
        .then(res=>{
            resolve(res.data.data)
        })
        .catch(error=>{
            reject(error)
        })
})

export {getData, postData}