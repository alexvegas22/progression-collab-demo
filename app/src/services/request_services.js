const axios = require('axios');

/**
 * fait une requete GET
 * @param lien: le lien COMPLET de la requete
 * @returns {Promise<unknown>}
 */
const config = {
	headers: {
		"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiamRvZSIsInJcdTAwZjRsZSI6MCwiYXZhbmNlbWVudHMiOnsiaHR0cHM6XC9cL3Byb2dyZXNzaW9uLnBhZ2VzLmR0aS5jcm9zZW1vbnQucXVlYmVjXC9wcm9ncmVzc2lvbl9jb250ZW51X2RlbW9cL2xlc19mb25jdGlvbnNfMDFcL2FwcGVsZXJfdW5lX2ZvbmN0aW9uX3BhcmFtJUMzJUE5dHIlQzMlQTllIjp7ImV0YXQiOjEsInR5cGUiOjMsInRlbnRhdGl2ZXMiOltdfX19LCJjdXJyZW50IjoxNjE3NzMwNjg1LCJleHBpcmVkIjoxLjAwMDAwMDAwMDAwMTYxNzdlKzIxfQ.0dNGuQU4CnOPaBQyNOmFTI3vYCVqHn0DVRraAOF1Wk4"
	},
};

const getData = async (lien) => {
    try {
        const res = await axios.get(lien, config)
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
        const res = await axios.post(lien, body, config)
        return res.data
    } catch (err) {
        console.log(err);
    }
}

export { getData, postData };
