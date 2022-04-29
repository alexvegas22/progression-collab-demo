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
				throw err;
			});
	} else {
		sauvegarderToken(null);
		throw "Clé d'authentification non disponible";
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

	async getConfigServeur({ commit }, urlConfig) {
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
			const user = await getUserApi( import.meta.env.VITE_API_URL + "/user/" + username, token);

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

	async setAuthentificationEnCours({ commit }, état) {
		commit("updateAuthentificationEnCours", état);
	},

	async getUser({ commit }, urlUser) {
		return valider( async () =>  {
			const token = await this.dispatch("getToken");
			const user = await getUserApi(urlUser, token);

			commit("setUser", user);
			return user;
		}
		);
	},

	async getQuestion({ commit }, urlQuestion) {
		return valider( async () =>  {
			const token = await this.dispatch("getToken");
			const question = await getQuestionApi(urlQuestion, token);

			commit("setQuestion", question);
			return question;
		}
		);
	},

	async setQuestion({ commit }, question) {
		commit("setQuestion", question);
	},

	async getAvancement({ commit, state }, params) {
		return valider(
			async () => {
				const token = params.token ?? await this.dispatch("getToken");
				const avancement = await getAvancementApi(params.url, token);

				commit("setAvancement", avancement);
				var tentative;

				if (Object.keys(avancement.sauvegardes).length > 0) {
					var datePlusRecente = 0;
					for (var key in avancement.sauvegardes) {
						if (avancement.sauvegardes[key].date_sauvegarde > datePlusRecente) {
							tentative = {
								code: avancement.sauvegardes[key].code,
								langage: key,
							};
							datePlusRecente = avancement.sauvegardes[key].date_sauvegarde;
						}
					}
				} else if (avancement.tentatives.length > 0) {
					tentative = avancement.tentatives[0];
				} else if (state.question) {
					var ebauches = state.question.ebauches;
					if (ebauches[params.lang_défaut]) {
						tentative = ebauches[params.lang_défaut];
					} else {
						tentative = ebauches[Object.keys(ebauches)[0]];
					}
				}
				commit("setTentative", tentative);
				commit("updateRetroaction", tentative);
				return avancement;
			}
		);
	},

	async setAvancement({ commit }, avancement) {
		commit("setAvancement", avancement);
	},

	async postAvancement({ commit, state }, params) {
		return valider( async () =>  {
			const token = await this.dispatch("getToken");
			const avancement = await postAvancementApi(params, token);

			commit("setAvancement", avancement);
			var tentative;

			if (Object.keys(avancement.sauvegardes).length > 0) {
				var datePlusRecente = 0;
				for (var key in avancement.sauvegardes) {
					if (avancement.sauvegardes[key].date_sauvegarde > datePlusRecente) {
						tentative = {
							code: avancement.sauvegardes[key].code,
							langage: key,
						};
						datePlusRecente = avancement.sauvegardes[key].date_sauvegarde;
					}
				}
			} else {
				var ebauches = state.question.ebauches;
				if (ebauches[params.lang_défaut]) {
					tentative = ebauches[params.lang_défaut];
				} else {
					tentative = ebauches[Object.keys(ebauches)[0]];
				}
			}

			commit("setTentative", tentative);
			commit("updateRetroaction", tentative);
			return avancement;
		}
		);
	},

	async postCommentaire(params){
		return valider( async () =>  {
			const token = await this.dispatch("getToken");
			return await postCommentaireApi(params, token);
		}
		);
	},

	async getTentative({ commit }, params) {
		return valider( async () =>  {
			const token = params.token ?? await this.dispatch("getToken");
			const tentative = await getTentativeApi(params.urlTentative, token);

			commit("setTentative", tentative);
			commit("updateRetroaction", tentative);
			return tentative;
		}
		);
	},

	async getNbRéussitesParLangage({ commit }, params){
		var langagesRéussis = new Object();
		var ceLangageEstRéussi = new Object();

		return valider( async () => {
			const token = params.token ?? await this.dispatch("getToken");
			const user = await getUserApi(params.url, token);

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

	async getDifficultésRéussies({commit}, params){
		var difficultésRéussies = new Object();
		return valider(async () => {
			const token = params.token ?? await this.dispatch("getToken");
			const user = await getUserApi(params.url, token);

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
		commit("updateRetroaction", null);

		return valider( async () =>  {
			try {
				const token = await this.dispatch("getToken");
				const retroactionTentative = await postTentative(params, token);

				commit("updateRetroaction", retroactionTentative);
				commit("updateEnvoieTentativeEnCours", false);
				state.avancement.tentatives.unshift(retroactionTentative);
				if (state.avancement.état != 2) {
					state.avancement.état = retroactionTentative.réussi ? 2 : 1;
				}

				if (state.cb_succes && state.cb_succes_params) {
					callbackGrade(state.cb_succes, {
						...state.cb_succes_params,
						uri: state.uri,
						token: state.token,
					});
				}
				return retroactionTentative;
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

	mettreAjourLangageSelectionne({ commit }, langage) {
		commit("updateLangageTentative", langage);
	},

	réinitialiser({ commit }, langage_p) {
		const langage = langage_p ?? this.state.tentative.langage;
		commit("setTentative", {
			langage: langage,
			code: this.state.question.ebauches[langage].code,
		});

		commit("updateRetroaction", null);
	},

	setToken({ commit }, token) {
		try {
			const token_décodé = jwt_decode(token);
			if (token_décodé.username) {
				commit("setToken", token);
				commit("setUsername", token_décodé.username);
			}
		} catch (e) {
			commit("setToken", null);
			commit("setUsername", null);
			return;
		}
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

	deleteToken({ commit }) {
		commit("setToken", null);
		commit("setUsername", null);
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

	setSélectionnerTestHaut({ commit }, val) {
		commit("setSélectionnerTestHaut", val);
	},

	setSélectionnerTestBas({ commit }, val) {
		commit("setSélectionnerTestBas", val);
	},

	setChangerModeAffichageAvecRaccourci({ commit }, val) {
		commit("setChangerModeAffichageAvecRaccourci", val);
	},

	setOngletCourant({ commit }, val) {
		commit("setOngletCourant", val);
	},

	setIndicateursDeFonctionnalité({ commit }, val) {
		const toggles = [];
		for( const toggle of val ){
			toggles[toggle.name] = {enabled: toggle.enabled, variant: toggle.variant};
		}
		commit("setIndicateursDeFonctionnalité", toggles);
	}
};
