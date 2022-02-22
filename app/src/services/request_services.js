const axios = require("axios");

/**
 * fait une requete GET
 * @param lien: le lien COMPLET de la requete
 * @returns {Promise<unknown>}
 */

const getData = async (lien, token = null) => {
	const config = token ? {
		headers: {
			Authorization: "Bearer " + token,
		},
	} : {};

	return axios.get(lien, config).then((réponse) => {
		return réponse.data;
	});
};

/**
 * Fait une requete Post a l'api
 * @param lien: Lien complet de la requete
 * @param body: le body COMPLET de la requete
 * @returns {Promise<unknown>}, a traiter a l'appel
 */
const postData = async (lien, body, token = null) => {
	const config = token ? {
		headers: {
			Authorization: "Bearer " + token,
		},
	} : {};

	return axios.post(lien, body, config).then((réponse) => {
		return réponse.data;
	});
};

export { getData, postData };
