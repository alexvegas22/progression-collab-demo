const axios = require('axios');

/**
 * fait une requete GET
 * VOIR la doc (lien dans README.MD)
 * @param lien: le lien COMPLET de la requete
 * @returns {Promise<unknown>}
 */
const config = {
	headers: {
		"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiamRvZSIsInJcdTAwZjRsZSI6MH0sImN1cnJlbnQiOjE2MTY2MzM3NTUsImV4cGlyZWQiOjE2MTY3MjAxNTV9.ul3pXIfnAYuwtXS5YYaPBmfUwt-I7apepfOiAbY65iM"
	},
};

const getData = (lien) =>
	new Promise((resolve, reject) => {
		axios.get(lien, config)
        .then(res=>{
            resolve(res.data)
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
    axios
        .post(lien, body)
        .then((res) => {
            resolve(res.data.data);
        })
        .catch((error) => {
            reject(error);
        });
});

export { getData, postData };
