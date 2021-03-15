import '../util/commun.js'

const axios = require('axios');

/**
 * fait une requete GET
 * VOIR la doc (lien dans README.MD)
 * @param lien: le lien COMPLET de la requete
 * @returns {Promise<unknown>}
 */
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