import { getData, postData } from "@/services/request_services";

const getUserApi = async (urlUser) => {
	try {
		const data = await getData(urlUser + "?include=avancements");
		var user = data.data.attributes;
		user.liens = data.data.links;
		user.liens.avancements = data.data.relationships.avancements.links.related;
		user.avancements = [];
		if (data.included) {
			data.included.forEach((item) => {
				var avancement = item.attributes;
				avancement.liens = item.links;
				user.avancements[item.id] = avancement;
			});
		}
		return user;
	} catch (err) {
		console.log(err);
	}
};

const getQuestionApi = async (urlQuestion) => {
	try {
		const data = await getData(urlQuestion + "?include=tests,ebauches");
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
	} catch (err) {
		console.log(err);
	}
};

const getAvancementApi = async (urlAvancement) => {
	try {
		const data = await getData(urlAvancement + "?include=tentatives");
		var avancement = data.data.attributes;
		avancement.liens = data.data.links;
		avancement.tentatives = [];
		if (data.included) {
			data.included.forEach((item) => {
				var tentative = item.attributes;
				tentative.liens = item.links;
				tentative.resultats = [];
				avancement.tentatives.unshift(tentative);
			});
		}
		return avancement;
	} catch (err) {
		console.log(err);
	}
};
const postAvancementApi = async (params) => {
	try {
		const body = (params.avancement)? {question_uri: params.question_uri, avancement: params.avancement} : {question_uri: params.question_uri}
		const data = await postData(params.url, body);
		var avancement = data.data.attributes;
		avancement.liens = data.data.links;
		avancement.tentatives = [];
		return avancement;
	} catch (err) {
		console.log(err);
	}
};

const getTentativeApi = async (urlTentative) => {
	try {
		const data = await getData(urlTentative);
		const tentative = data.data.attributes;
		tentative.liens = data.data.links;
		tentative.resultats = [];

		return tentative;
	} catch (err) {
		console.log(err);
	}
};
const postTentative = async (params) => {
	try {
		const body = { langage: params.langage, code: params.code };
		const urlRequete = params.urlTentative + "?include=resultats";
		const data = await postData(urlRequete, body);

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
	} catch (err) {
		console.log(err);
	}
};

export { getUserApi, getQuestionApi, getTentativeApi, getAvancementApi, postTentative, postAvancementApi };
