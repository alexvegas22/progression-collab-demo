import { getData, postData, patchData } from "@/services/request_services";

//Ressources permises par les token d'authentification.
//Exclut l'accès aux ressources tokens et cles
const ressources_token_auth = { data: { expiration: "+300",
	                                    fingerprint: true,
	                                    ressources: { api: { url: "^(users?|ebauche|question|test|avancement|tentative|commentaire|test|sauvegarde)((?!tokens|cles).)*\/?$", //eslint-disable-line no-useless-escape
	                                                         method: "^.*" } } } };

const authentifierApi = async (urlAuth, identifiant, mdp, domaine) => {
	const urlTokens = (await getData(urlAuth, null, { identifiant: identifiant, password: mdp, domaine: domaine })).data.links.tokens;

	const data = (await postData(urlTokens, null, ressources_token_auth, { identifiant: identifiant, password: mdp, domaine: domaine })).data;

	return data ? construireToken( data ) : null;
};

const inscrireApi = async (urlInscription, identifiant, courriel, mdp) => {
	return construireUser(await postData(urlInscription, null, { username: identifiant, courriel: courriel, password: mdp } ));
};

const getTokenApi = async (urlAuth, identifiant, clé) => {
	const token = ( await postData( urlAuth,
	                                null,
	                                ressources_token_auth,
		                            { identifiant: identifiant,
		                              key_name: clé } ) ).data;
	return token ? construireToken( token ): null;
};

const getConfigServeurApi = async (urlConfig, token, identifiant, clé) => {
	if(token){
		return construireConfig( (await getData(urlConfig, null, token.jwt) ).data );
	}
	else if( identifiant && clé ){
		return construireConfig( (await getData(urlConfig, null, { identifiant: identifiant, key_name: clé })).data );
	}
	else {
		return construireConfig( (await getData(urlConfig) ).data );
	}
};

const getUserApi = async (urlUser, token) => {
	const query = { include: "avancements" };
	return construireUser( await getData( urlUser, query, token.jwt ) );
};

const getUserAvecTentativesApi = async (urlUser, token) => {
	const query = { include: "avancements.tentatives" };
	return getData(urlUser, query, token.jwt).then((data) => {
		return construireUser( data );
	});
};

const construireUser = ( data ) => {
	var user = data.data.attributes;
	user.préférences = data.data.attributes.préférences ? JSON.parse(data.data.attributes.préférences) : {};
	user.liens = data.data.links;
	user.liens.avancements = data.data.relationships.avancements.links.related;
	user.liens.clés = data.data.relationships.cles.links.related;
	user.avancements = {};
	var tentatives = {};
	if (data.included) {
		data.included.forEach((item) => {
			if (item.type == "avancement") {
				var avancement = item.attributes;
				avancement.liens = item.links;
				avancement.relations = item.relationships;
				user.avancements[item.id] = avancement;
			}
			else if (item.type == "tentative") {
				var tentative = item.attributes;
				tentative.liens = item.links;
				tentatives[item.id] = tentative;
			}
		});

		Object.keys(user.avancements).forEach((id) =>{
			var avancement = user.avancements[id];
			avancement.tentatives = [];
			avancement.relations?.tentatives?.data?.forEach((tentative) => {
				var id = tentative["id"];
				avancement.tentatives.push(tentatives[id]);
			});
		});

	}

	return user;
};


function construireToken(data) {
	var token = data.attributes;
	token.liens = data.links;

	return token;
}

const getQuestionApi = async (urlQuestion, token) => {
	const query = { include: "tests,ebauches" };
	const data = await getData(urlQuestion, query, token.jwt);
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
	const data = await getData(url, query, token.jwt);
	var avancement = construireAvancement(data.data, data.included);
	return avancement;
};

const patchUserApi = async (params, token) => {
	const url = params.url;
	const user = params.user;
	const data = await patchData(url, null, {état: user.état, préférences: JSON.stringify(user.préférences)}, token.jwt);
	return construireUser( data );
};

const postAvancementApi = async (params, token) => {
	const query = { include: "tentatives,sauvegardes" };
	const body = {
		question_uri: params.question_uri,
		avancement: params.avancement
	};
	const data = await postData(params.url, query, body, token.jwt);
	var avancement = construireAvancement(data.data, data.included);
	return avancement;
};

const getTousAvancementsApi = async (url, token, tokenRessources) => {
	const query = { tkres: tokenRessources };
	const data = await getData(url, query, token.jwt);
	let avancements = {};
	data.data.forEach((item) => {
		avancements[item.id] = construireAvancement(item, null);
	});
	return avancements;
};

const postCommentaireApi = async (params, token) => {
	const body = params;
	const data = await postData(params.url, null, body, token.jwt);
	return data;
};

const getTentativeApi = async (url, token, tokenRessources) => {
	const query = { include: "commentaires", tkres: tokenRessources };
	const data = await getData(url, query, token.jwt);
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
	const body = { langage: params.tentative.langage, code: params.tentative.code };
	const data = await postData(urlRequete, query, body, token.jwt);

	if (data.erreur) {
		console.log(data.erreur);
		return null;
	}

	return construireTentative( data.data, data.included );
};

const postTentativeSys = async (params, token) => {
	const urlRequete = params.urlTentative;
	const query = { include: "resultats" };
	const body = { conteneur_id: params.tentative.conteneur_id };
	const data = await postData(urlRequete, query, body, token.jwt);

	if (data.erreur) {
		return null;
	}

	return construireTentative( data.data, data.included );
};

const postRésultat = async (params, token) => {
	const urlRequete = params.url;
	const body = { langage: params.tentative.langage, code: params.tentative.code, test: params.test, index: params.index };
	const data = await postData(urlRequete, null, body, token.jwt);

	if (data.erreur) {
		console.log(data.erreur);
		return null;
	}

	var résultat = data.data.attributes;
	résultat.liens = data.data.links;
	return résultat;
};

const postAuthKey = async (params, identifiant, password, domaine) =>
	await postData(params.url, null, params.clé, { identifiant: identifiant, password: password, domaine: domaine } )
		.then((data) => {
			return {
				nom: params.clé.nom,
				clé: data.data.attributes
			};
		});

const callbackGrade = async (url, params) => {
	return postData(url, null, params);
};

const callbackAuth = async (url, params) => {
	await postData(url, null, params);
};

const postSauvegardeApi = async (params, token) => {
	const urlRequete = params.url;
	const body = { langage: params.langage, code: params.code };
	const data = await postData(urlRequete, null, body, token.jwt);

	if (data.erreur) {
		throw data.erreur;
	}

	return construireSauvegarde(data.data);
};

const postUserApi = async (params, token) => {
	const url = params.url;
	const body = { préférences: JSON.stringify(params.préférences) };
	const data = await postData( url, null, body, token.jwt );

	if (data.erreur) {
		throw data.erreur;
	}

};

function construireAvancement(data, included) {
	var avancement = data.attributes;
	avancement.liens = data.links;
	avancement.liens.sauvegardes = data.relationships.sauvegardes.links.related;
	avancement.liens.tentatives = data.relationships.tentatives.links.related;
	avancement.tentatives = [];
	avancement.sauvegardes = {};
	if(avancement.extra) avancement.extra = JSON.parse( avancement.extra );
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

function construireConfig(item) {
	var config = item.attributes.config;
	config.liens = item.links;

	return config;
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
				tentative.commentaires.push(commentaire);
			}
			else if (item.type == "resultat") {
				const résultat = {
					...item.attributes,
					liens: item.links
				};
				tentative.resultats.push(résultat);
			}
		});
	}
	return tentative;
}

export {
	authentifierApi,
	inscrireApi,
	callbackAuth,
	callbackGrade,
	getConfigServeurApi,
	getAvancementApi,
	getTousAvancementsApi,
	getQuestionApi,
	getTentativeApi,
	getTokenApi,
	getUserApi,
	getUserAvecTentativesApi,
	postAvancementApi,
	patchUserApi,
	postCommentaireApi,
	postRésultat,
	postSauvegardeApi,
	postTentative,
	postTentativeSys,
	postAuthKey,
	postUserApi,
};
