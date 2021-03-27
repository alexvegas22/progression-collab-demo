const axios = require('axios');

/**
 * fait une requete GET
 * @param lien: le lien COMPLET de la requete
 * @returns {Promise<unknown>}
 */
const config = {
	headers: {
		"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiamRvZSIsInJcdTAwZjRsZSI6MH0sImN1cnJlbnQiOjE2MTY2MzM3NTUsImV4cGlyZWQiOjE2MTY3MjAxNTV9.ul3pXIfnAYuwtXS5YYaPBmfUwt-I7apepfOiAbY65iM"
	},
};

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
