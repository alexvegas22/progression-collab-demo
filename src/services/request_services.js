const axios = require('axios');

/**
 * fait une requete GET
 * @param lien: le lien COMPLET de la requete
 * @returns {Promise<unknown>}
 */
/*const getData = (lien) =>
  new Promise((resolve, reject) => {
    axios.get(lien)
        .then(res=>{
            resolve(res.data)
        })
        .catch(error=>{
            reject(error)
        })
})*/

const getData = async (lien) => {
    try {
        const res = await axios.get(lien)
        return res.data
    } catch (err) {
        console.log(err);
    }
}

/**
 * Fait une requete Post a l'api
 * @param lien: Lien complet de la requete
 * @param body: le body COMPLET de la requete
 * @returns {Promise<unknown>}, a traiter a l'appel
 */
/*const postData = (lien, body)=> new Promise((resolve, reject)=> {
    //let token = localStorage.getItem('user-token')
    axios
        .post(lien, body)
        .then((res) => {
            resolve(res.data.data);
        })
        .catch((error) => {
            reject(error);
        });
});*/

const postData = async (lien, body) => {
    //let token = localStorage.getItem('user-token')
    try {
        const res = await axios.post(lien, body)
        return res.data.data
    } catch (err) {
        console.log(err);
    }
}

export { getData, postData };
