import { getData, postData } from "@/services/request_services";

const authentifierApi = async (urlAuth, nom_utilisateur, mdp, domaine) =>
	(await postData(urlAuth, null, { username: nom_utilisateur, password: mdp, domaine: domaine })).Token;

const getTokenApi = async (urlAuth, nom_utilisateur, clé) =>
	(await postData(urlAuth, null, { username: nom_utilisateur, key_name: clé.nom, key_secret: clé.secret })).Token;

const getConfigServeurApi = async (urlConfig) => {
	return getData(urlConfig).then((data) => {
		var config = data;

		return config;
	});
};

const getUserApi = async (urlUser, token) => {
	const query = { inlude: "avancements" };
	return getData(urlUser, query, token).then((data) => {
		var user = data.data.attributes;
		user.liens = data.data.links;
		user.liens.avancements = data.data.relationships.avancements.links.related;
		user.liens.clés = data.data.relationships.cles.links.related;
		user.avancements = {};
		if (data.included) {
			data.included.forEach((item) => {
				var avancement = item.attributes;
				avancement.liens = item.links;
				user.avancements[item.id] = avancement;
			});
		}
		return user;
	});
};

const getQuestionApi = async (urlQuestion, token) => {
	const query = { include: "tests,ebauches" };
	const data = await getData(urlQuestion, query, token);
	var question = data.data.attributes;
	question.liens = data.data.links;
	question.tests = [];
	question.ebauches = {};
	if (data.included) {
		data.included.forEach((item) => {
			if (item.type == "test") {
				var test = item.attributes;
				test.liens = item.links;
				question.tests.push(test);
			} else if (item.type == "ebauche") {
				var ebauche = item.attributes;
				ebauche.liens = item.links;
				question.ebauches[ebauche.langage] = ebauche;
			}
		});
	}
	return question;
};

const getAvancementApi = async (url, token, tokenRessources) => {
	const query = { include: "tentatives,sauvegardes", tkres: tokenRessources };
	const data = await getData(url, query, token);
	var avancement = construireAvancement(data.data, data.included);
	return avancement;
};

const postAvancementApi = async (params, token) => {
	const query = { include: "tentatives,sauvegardes" };
	const body = { question_uri: params.question_uri };
	const data = await postData(params.url, query, body, token);
	var avancement = construireAvancement(data.data, data.included);
	return avancement;
};

const getTousAvancementsApi = async (url, token, tokenRessources) => {
	const query = { tkres: tokenRessources };
	const data = await getData(url, query, token);
	let avancements = {};
	data.data.forEach((item) => {
		avancements[item.id] = construireAvancement(item, null);
	});
	return avancements;
};

const postCommentaireApi = async (params, token) => {
	const body = params;
	const data = await postData(params.url, null, body, token);
	return data;
};

const getTentativeApi = async (url, token, tokenRessources) => {
	const query = { include: "commentaires", tkres: tokenRessources };
	const data = await getData(url, query, token);
	var tentative = construireTentative(data.data, data.included);
	if (data.erreur) {
		console.log(data.erreur);
		return null;
	}

	return tentative;
};

const postTentative = async (params, token) => {
	const urlRequete = params.urlTentative;
	const query = { include: "resultats" };
	const body = { langage: params.tentative.langage, code: params.tentative.code, test: params.tests };
	const data = await postData(urlRequete, query, body, token);

	if (data.erreur) {
		console.log(data.erreur);
		return null;
	}

	var tentative = data.data.attributes;
	tentative.liens = data.data.links;
	tentative.resultats = [];
	if (data.included) {
		data.included.forEach((item) => {
			var resultat = item.attributes;
			resultat.liens = item.links;
			tentative.resultats.push(resultat);
		});
	}
	return tentative;
};

const postAuthKey = async (params, token) =>
	await postData(params.url, null, params.clé, token)
		.then((data) => {
			return {
				nom: params.clé.nom,
				clé: data.data.attributes
			};
		});

const callbackGrade = async (url, params) => {
	await postData(url, null, params);
};

const callbackAuth = async (url, params) => {
	await postData(url, null, params);
};

const postSauvegardeApi = async (params, token) => {
	const urlRequete = params.url;
	const body = { langage: params.langage, code: params.code };
	const data = await postData(urlRequete, null, body, token);

	if (data.erreur) {
		throw data.erreur;
	}

	return construireSauvegarde(data.data);
};

function construireAvancement(data, included) {
	var avancement = data.attributes;
	avancement.liens = data.links;
	avancement.liens.sauvegardes = data.relationships.sauvegardes.links.related;
	avancement.liens.tentatives = data.relationships.tentatives.links.related;
	avancement.tentatives = [];
	avancement.sauvegardes = {};
	if (included) {
		included.forEach((item) => {
			if (item.type == "tentative") {
				avancement.tentatives.unshift(construireTentative(item));
			} else if (item.type == "sauvegarde") {
				var sauvegarde = construireSauvegarde(item);
				avancement.sauvegardes[sauvegarde.langage] = sauvegarde;
			}
		});
	}
	return avancement;
}

function construireSauvegarde(item) {
	var sauvegarde = item.attributes;
	var res = item.id.split("/");
	var langage = res[res.length - 1];
	sauvegarde.liens = item.links;
	sauvegarde.langage = langage;

	return sauvegarde;
}

function construireTentative(data, included = null) {
	var tentative;
	tentative = data.attributes;
	tentative.liens = data.links;
	tentative.liens.commentaires = data.relationships.commentaires.links.related;
	tentative.liens.resultats = data.relationships.resultats.links.related;

	tentative.resultats = [];
	tentative.commentaires = [];
	if (included) {
		included.forEach((item) => {
			if (item.type == "commentaire") {
				const commentaire = {
					...item.attributes,
					liens: item.links
				};
				tentative.commentaires.unshift(commentaire);
			}
		});
	}
	return tentative;
}

export {
	authentifierApi,
	callbackAuth,
	callbackGrade,
	getConfigServeurApi,
	getAvancementApi,
	getTousAvancementsApi,
	getQuestionApi,
	getTentativeApi,
	getTokenApi,
	getUserApi,
	postAvancementApi,
	postCommentaireApi,
	postSauvegardeApi,
	postTentative,
	postAuthKey,
};
