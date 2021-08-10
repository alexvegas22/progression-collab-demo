const axios = require("axios");

/**
 * fait une requete GET
 * @param lien: le lien COMPLET de la requete
 * @returns {Promise<unknown>}
 */

const getData = async (lien, token) => {
	const config = {
		headers: {
			Authorization: "Bearer " + token,
		},
	};
	const res = await axios.get(lien, config);
	return res.data;
};

/**
 * Fait une requete Post a l'api
 * @param lien: Lien complet de la requete
 * @param body: le body COMPLET de la requete
 * @returns {Promise<unknown>}, a traiter a l'appel
 */
const postData = async (lien, body, token) => {
	const config = {
		headers: {
			Authorization: "Bearer " + token,
		},
	};
	const res = await axios.post(lien, body, config);
	return res.data;
};

export { getData, postData };
