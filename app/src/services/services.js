import { getData, postData } from "@/services/request_services";

const authentifierApi = async (urlAuth, nom_utilisateur, mdp) =>
	(await postData(urlAuth, { username: nom_utilisateur, password: mdp })).Token;

const getTokenApi = async (urlAuth, nom_utilisateur, clé) =>
	(await postData(urlAuth, { username: nom_utilisateur, key_name: clé.nom, key_secret: clé.secret })).Token;

const getUserApi = async (urlUser, token) => {
	return getData(urlUser + "?include=avancements", token).then((data) => {
		var user = data.data.attributes;
		user.liens = data.data.links;
		user.liens.avancements = data.data.relationships.avancements.links.related;
		user.liens.clés = data.data.relationships.cles.links.related;
		user.avancements = [];
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
	const data = await getData(urlQuestion + "?include=tests,ebauches", token);
	var question = data.data.attributes;
	question.liens = data.data.links;
	question.tests = [];
	question.ebauches = [];
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

const getAvancementApi = async (urlAvancement, token) => {
	const data = await getData(urlAvancement + "?include=tentatives,sauvegardes", token);
	var avancement = construireAvancement(data);
	return avancement;
};

const postAvancementApi = async (params, token) => {
	const body = { question_uri: params.question_uri };
	const data = await postData(params.url + "?include=tentatives,sauvegardes", body, token);
	var avancement = construireAvancement(data);
	return avancement;
};

const getTentativeApi = async (urlTentative, token) => {
	const data = await getData(urlTentative, token);
	const tentative = data.data.attributes;
	tentative.liens = data.data.links;
	tentative.resultats = [];

	if (data.erreur) {
		console.log(data.erreur);
		return null;
	}

	return tentative;
};
const postTentative = async (params, token) => {
	const body = { langage: params.langage, code: params.code };
	const urlRequete = params.urlTentative + "?include=resultats";
	const data = await postData(urlRequete, body, token);

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

const callbackGrade = async (url, params) => {
	await postData(url, params);
};

const callbackAuth = async (url, params) => {
	await postData(url, params);
};

const postSauvegardeApi = async (params, token) => {
	const body = { langage: params.langage, code: params.code };
	const urlRequete = params.url;
	const data = await postData(urlRequete, body, token);

	if (data.erreur) {
		throw data.erreur;
	}

	return construireSauvegarde(data.data);
};

function construireAvancement(data) {
	var avancement = data.data.attributes;
	avancement.liens = data.data.links;
	avancement.liens.sauvegardes = data.data.relationships.sauvegardes.links.related;
	avancement.tentatives = [];
	avancement.sauvegardes = [];
	if (data.included) {
		data.included.forEach((item) => {
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

function construireTentative(item) {
	var tentative = item.attributes;
	tentative.liens = item.links;
	tentative.resultats = [];

	return tentative;
}

export {
	authentifierApi,
	callbackAuth,
	callbackGrade,
	getAvancementApi,
	getQuestionApi,
	getTentativeApi,
	getTokenApi,
	getUserApi,
	postAvancementApi,
	postSauvegardeApi,
	postTentative,
};
