import {
	authentifierApi,
	callbackGrade,
	getConfigServeurApi,
	getAvancementApi,
	getQuestionApi,
	getTentativeApi,
	getTokenApi,
	getUserApi,
	postAvancementApi,
	postCommentaireApi,
	postSauvegardeApi,
	postTentative,
	postAuthKey
} from "@/services/index.js";

import i18n from "@/util/i18n";

import tokenEstValide from "@/util/token.js";

import jwt_decode from "jwt-decode";

var validateur = (v) => v;
const valider = async function(promesse){
	return validateur(promesse());
};

const API_URL = import.meta.env.VITE_API_URL;

async function rafraîchirToken() {
	const authKey = récupérerCléSauvegardée();
	const username = récupérerUsername();

	if (authKey) {
		return getTokenApi(API_URL + "/auth", username, authKey)
			.then((token) => {
				sauvegarderToken(token);
				return token;
			})
			.catch((err) => {
				sauvegarderToken(null);
				console.log(err);
				throw err;
			});
	} else {
		sauvegarderToken(null);
		const err = new Error("Clé d'authentification non disponible");
		console.log(err);
		throw err;
	}
}

function récupérerUsername() {
	return sessionStorage.getItem("username") || localStorage.getItem("username");
}

function récupérerCléSauvegardée() {
	if (sessionStorage.getItem("authKey_nom") && sessionStorage.getItem("authKey_secret"))
		return { nom: sessionStorage.getItem("authKey_nom"), secret: sessionStorage.getItem("authKey_secret") };

	if (localStorage.getItem("authKey_nom") && localStorage.getItem("authKey_secret"))
		return { nom: localStorage.getItem("authKey_nom"), secret: localStorage.getItem("authKey_secret") };

	return null;
}

function sauvegarderToken(token) {
	if (localStorage.getItem("token")) localStorage.setItem("token", token);
	else sessionStorage.setItem("token", token);
}

function générerAuthKey(user, token, expiration = 0) {
	const clé_id = "LTIauthKey_" + randomID();

	return {
		nom: clé_id,
		portée: 1,
		expiration: expiration,
	};
}

function randomID() {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return Math.random().toString(36).substr(2, 9);
}

function récupérerListeAvecPourcentageRéussi(élémentsRéussis) {

	const réussis = Object.keys(élémentsRéussis);
	const listeRéussis = [];
	for(let langage of réussis){
		let pourcentage = récupérerPourcentageRéussi(élémentsRéussis,langage);
		listeRéussis.push([langage, pourcentage]);
	}

	return listeRéussis;

}

function récupérerPourcentageRéussi(réussis, langage){
	var totalRéussi = 0;
	var pourcentage = 0;
	for (var tentative in réussis) {
		totalRéussi += réussis[tentative];
	}
	pourcentage = (100 / totalRéussi) * réussis[langage];
	return pourcentage.toFixed(1);
}

function sélectionnerTentative(avancement, question, lang_défaut){
	var tentative;

	if (Object.keys(avancement.sauvegardes).length > 0) {
		var datePlusRecente = 0;
		for (var key in avancement.sauvegardes) {
			if (avancement.sauvegardes[key].date_sauvegarde > datePlusRecente) {
				tentative = {
					code: avancement.sauvegardes[key].code,
					langage: key,
					resultats: []
				};
				datePlusRecente = avancement.sauvegardes[key].date_sauvegarde;
			}
		}
	} else if (avancement.tentatives.length > 0) {
		tentative = avancement.tentatives[0];
	} else if (question) {
		var ebauches = question.ebauches;
		if (ebauches[lang_défaut]) {
			tentative = ebauches[lang_défaut];
		} else {
			tentative = ebauches[Object.keys(ebauches)[0]];
		}
	}

	return tentative;
}

export default {
	async setValidateur(v) {
		validateur = v;
	},

	async setErreurs({ commit }, erreurs) {
		commit("setErreurs", erreurs);
	},


	async getToken({ commit, state }) {
		if (tokenEstValide(state.token)) {
			return state.token;
		} else {
			commit("setToken", null);
			return rafraîchirToken().then((token) => {
				commit("setToken", token);
				return token;
			});
		}
	},

	async récupérerConfigServeur({ commit }, urlConfig) {
		return valider( async () =>  {
			const config = await getConfigServeurApi(urlConfig);

			commit("setConfigServeur", config);
			return config;
		}
		);
	},

	async authentifier({ commit }, params) {
		const urlAuth = import.meta.env.VITE_API_URL + (params.inscrire ? "/inscription" : "/auth");
		const username = params.username;
		const password = params.password;
		const persister = params.persister;
		const domaine = params.domaine;
		commit("updateAuthentificationEnCours", true);

		return valider( async () =>  {
			const token = await authentifierApi(urlAuth, username, password, domaine);

			commit("setUsername", username);
			commit("setToken", token);

			sessionStorage.setItem("token", token);

			// Obtenir l'utilisateur
			const user = await this.dispatch("récupérerUser", import.meta.env.VITE_API_URL + "/user/" + username );

			// Obtenir la clé d'authentification
			var clé = générerAuthKey(user, token, persister ? 0 : (Math.floor(Date.now()/1000 + parseInt(import.meta.env.VITE_API_AUTH_KEY_TTL))));

			const authKey = await postAuthKey({ url: user.liens.clés, clé: clé }, token);

			const storage = persister ? localStorage : sessionStorage;
			storage.setItem("username", username);
			storage.setItem("authKey_nom", authKey.nom);
			storage.setItem("authKey_secret", authKey.clé.secret);

			return token;
		}
		);
	},

	async récupérerUser({ commit }, urlUser) {
		return valider( async () =>  {
			const token = await this.dispatch("getToken");
			const user = await getUserApi(urlUser, token);

			commit("setUsername", user.username);
			commit("setUser", user);
			return user;
		}
		);
	},

	async récupérerQuestion({ commit }, urlQuestion) {
		commit("setQuestion", null);
		commit("setAvancement", null);
		commit("setTentative", null);
		return valider( async () =>  {
			const token = await this.dispatch("getToken");
			const question = await getQuestionApi(urlQuestion, token);

			commit("setQuestion", question);
			return question;
		}
		);
	},

	async récupérerAvancement({ commit, state }, params) {
		return valider(
			async () => {
				const token = params.token ?? await this.dispatch("getToken");
				const avancement = await getAvancementApi(params.url, token);

				commit("setAvancement", avancement);

				commit("setTentative", sélectionnerTentative(avancement, state.question, state.langageDéfaut));
				return avancement;
			}
		);
	},

	async créerAvancement({ commit, state }, params) {
		return valider( async () =>  {
			const token = await this.dispatch("getToken");
			const avancement = await postAvancementApi(params, token);

			commit("setAvancement", avancement);

			commit("setTentative", sélectionnerTentative(avancement, state.question, state.langageDéfaut));
			return avancement;
		}
		);
	},

	async créerCommentaire({commit}, params){ // eslint-disable-line no-unused-vars
		return valider( async () =>  {
			const token = await this.dispatch("getToken");
			return await postCommentaireApi(params, token);
		}
		);
	},

	async récupérerTentative({ commit }, params) {
		return valider( async () =>  {
			const token = params.token ?? await this.dispatch("getToken");
			const tentative = await getTentativeApi(params.urlTentative, token);

			commit("setTentative", tentative);
			return tentative;
		}
		);
	},

	async récupérerNbRéussitesParLangage({ commit }, params){
		var langagesRéussis = new Object();
		var ceLangageEstRéussi = new Object();

		var token;
		var user;
		return valider( async () => {
			if(params.token){
				token = params.token;
				user = await getUserApi(params.url, token);
			}
			else{
				token = await this.dispatch("getToken");
				user = this.state.user;
			}

			for (var id in user.avancements) {

				const avancement = user.avancements[id];
				const tentatives = (await getAvancementApi(avancement.liens.self, token)).tentatives;
				for (let tentative of tentatives) {
					ceLangageEstRéussi[tentative.langage] = false;
				}
				for (let tentative of tentatives) {
					if (tentative.réussi) {
						if (tentative.langage in langagesRéussis) {
							if (ceLangageEstRéussi[tentative.langage] == false) {
								langagesRéussis[tentative.langage] += 1;
								ceLangageEstRéussi[tentative.langage] = true;
							}
						}
						else {
							if (ceLangageEstRéussi[tentative.langage] == false) {
								langagesRéussis[tentative.langage] = 1;
								ceLangageEstRéussi[tentative.langage] = true;
							}
						}
					}
				}
			}
			langagesRéussis = récupérerListeAvecPourcentageRéussi(langagesRéussis);
			commit("setNbRéussitesParLangage", langagesRéussis);
			return langagesRéussis;
		}
		);
	},

	async récupérerDifficultésRéussies({commit}, params){
		var difficultésRéussies = new Object();

		var token;
		var user;

		return valider( async () => {
			if(params.token){
				token = params.token;
				user = await getUserApi(params.url, token);
			}
			else{
				token = await this.dispatch("getToken");
				user = this.state.user;
			}

			for (const idAvancement in user.avancements) {
				const avancement = user.avancements[idAvancement];
				if(avancement.niveau === null || avancement.niveau === ""){
					avancement.niveau = "[N/D]";
				}
				if (avancement.état == 2) {
					if (avancement.niveau in difficultésRéussies) {
						difficultésRéussies[avancement.niveau] += 1;
					}
					else {
						difficultésRéussies[avancement.niveau] = 1;
					}
				}
			}
			difficultésRéussies = récupérerListeAvecPourcentageRéussi(difficultésRéussies);
			commit("setDifficultésRéussies", difficultésRéussies);
			return difficultésRéussies;
		}
		);
	},

	async soumettreTentative({ commit, state }, params) {
		commit("updateEnvoieTentativeEnCours", true);

		params.urlTentative = state.avancement.liens.tentatives;
		const tentative = state.tentative;

		commit("setTentative", {code: tentative.code, langage: tentative.langage, resultats: []} );

		return valider( async () =>  {
			try {
				const token = await this.dispatch("getToken");
				const tentative = await postTentative(params, token);

				commit("setTentative", tentative);
				commit("updateEnvoieTentativeEnCours", false);
				state.avancement.tentatives.unshift(tentative);
				if (state.avancement.état != 2) {
					state.avancement.état = tentative.réussi ? 2 : 1;
				}

				if (state.cb_succes && state.cb_succes_params) {
					callbackGrade(state.cb_succes, {
						...state.cb_succes_params,
						uri: state.uri,
						token: state.token,
					});
				}
				return tentative;
			}
			catch (e) {
				commit("updateEnvoieTentativeEnCours", false);
				
				if(e?.response?.status==400) {
					throw i18n.global.t("erreur.tentative_intraitable");
				}
				else{
					throw(e);
				}
			}
		}
		);
	},

	soumettreTestUnique({commit, state}, params) {
		const test = {entrée: params.test.entrée, params: params.test.params, sortie_attendue:params.test.sortie_attendue}; 
		const indexTestSélectionné = params.index;
		params.urlTentative = state.avancement.liens.tentatives;
		params.test = test;
		const tentativeCourante = state.tentative;
		
		return valider( async () => {
			try {
				const token = await this.dispatch("getToken");
				const retroactionTest = await postTentative(params, token);
				
				//Modifier le test exécuté
				if(tentativeCourante.resultats){
					tentativeCourante.resultats[indexTestSélectionné] = retroactionTest.resultats[0];
				}
				commit("setTentative", tentativeCourante);
				return tentativeCourante;
			}
			catch (e) {
				if(e?.response?.status==400) {
					throw i18n.global.t("erreur.tentative_intraitable");
				}
				else{
					throw(e);
				}
			}
		}
		);
	},

	async mettreAjourSauvegarde({ commit, state }) {
		const params = {
			url: state.avancement.liens.sauvegardes,
			code: state.tentative.code,
			langage: state.tentative.langage,
		};

		return valider( async () =>  {

			const token = await this.dispatch("getToken");
			const sauvegarde = await postSauvegardeApi(params, token);

			if (sauvegarde) {
				commit("setSauvegarde", sauvegarde);
				return sauvegarde;
			}
		}
		);
	},

	mettreAjourCode({ commit }, code) {
		commit("updateCodeTentative", code);
	},

	réinitialiser({ commit }, langage_p) {
		const langage = langage_p ?? this.state.tentative.langage;
		commit("setTentative", {
			langage: langage,
			code: this.state.question.ebauches[langage].code,
			resultats: [],
			tests_réussis: null
		});
	},

	setToken({ commit }, token) {
		if(token){
			try {
				const token_décodé = jwt_decode(token);
				if (token_décodé.username) {
					commit("setToken", token);
					commit("setUsername", token_décodé.username);
				}
			} catch (e) {
				commit("setToken", null);
				commit("setUsername", null);
				commit("setUser", null);
			}
		}
		else {
			commit("setToken", null);
		}
	},

	setUser({ commit }, user){
		commit("setUser", user);
	},
	
	setUri({ commit }, uri) {
		commit("setUri", uri);
	},

	setLangageDéfaut({ commit }, langageDéfaut) {
		commit("setLangageDéfaut", langageDéfaut);
	},

	setDémo({ commit }, val) {
		commit("setDémo", val);
	},

	setCallbackSucces({ commit }, cb_succes) {
		commit("setCallbackSucces", cb_succes);
	},

	setCallbackSuccesParams({ commit }, cb_succes_params) {
		commit("setCallbackSuccesParams", cb_succes_params);
	},

	setCallbackAuth({ commit }, cb_auth) {
		commit("setCallbackAuth", cb_auth);
	},

	setCallbackAuthParams({ commit }, cb_auth_params) {
		commit("setCallbackAuthParams", cb_auth_params);
	},

	setTokenRessources({ commit }, tokenRessources) {
		commit("setTokenRessources",tokenRessources);
	},

	setUsername({ commit }, username) {
		commit("setUsername", username);
	},

	setAuthentificationErreurHandler({ commit }, authentificationErreurHandler) {
		commit("setAuthentificationErreurHandler", authentificationErreurHandler);
	},
	
	setThèmeSombre({ commit }, val) {
		commit("setThèmeSombre", val);
	},

	setModeAffichage({ commit }, val) {
		commit("setModeAffichage", val);
	},

	setChangerModeAffichageAvecRaccourci({ commit }, val) {
		commit("setChangerModeAffichageAvecRaccourci", val);
	},

	setIndicateursDeFonctionnalité({ commit }, val) {
		const toggles = [];
		for( const toggle of val ){
			toggles[toggle.name] = {enabled: toggle.enabled, variant: toggle.variant};
		}
		commit("setIndicateursDeFonctionnalité", toggles);
	},
	updateRetroaction({ commit }, val) {
		commit("updateRetroaction", val);
	}
};
