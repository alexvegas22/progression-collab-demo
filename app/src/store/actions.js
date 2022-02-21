


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
	postSauvegardeApi,
	postTentative,
	postAuthKey
} from "@/services/index.js";

import tokenEstValide from "@/util/token.js";

import jwt_decode from "jwt-decode";

var validateur = (v) => v;
const valider = async function(commit, promesse){
	return validateur(promesse)
}

const API_URL = process.env.VUE_APP_API_URL;

async function getToken({ commit, state }) {
	if (tokenEstValide(state.token)) {
		return state.token;
	} else {
		commit("setToken", null);
		return rafraîchirToken().then((token) => {
			commit("setToken", token);
			return token;
		});
	}
}

async function rafraîchirToken() {
	const authKey = récupérerCléSauvegardée();
	const username = récupérerUsername();

	if (authKey) {
		return getTokenApi(API_URL + "/auth", username, authKey)
			.then((token) => {
				sauvegarderToken(token);
				return token;
			})
			.catch( (err) => {
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

function générerAuthKey(user, token, expiration=0) {
	const clé_id = "LTIauthKey_" + randomID();

	return { nom: clé_id,
				  portée: 1,
				  expiration: expiration,
	}
}

function randomID() {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return Math.random().toString(36).substr(2, 9);
}

export default {
	async setValidateur( v ){
		validateur = v;
	},
	
	async setErreurs({ commit, state }, erreurs) {
		commit("setErreurs", erreurs);
	},

	async getConfigServeur({commit, state }, urlConfig){
		return valider(commit, getConfigServeurApi(urlConfig)
			.then((config)=>{
				commit("setConfigServeur", config);
				return config;
			})
		);
	},

	async authentifier({ commit, state }, params) {
		const urlAuth = process.env.VUE_APP_API_URL + (params.inscrire ? "/inscription" : "/auth");
		const username = params.username;
		const password = params.password;
		const persister = params.persister;
		const domaine = params.domaine;
		commit("updateAuthentificationEnCours", true);

		return valider(commit, (async () => {
			const token = await authentifierApi(urlAuth, username, password, domaine)

			commit("setUsername", username);
			commit("setToken", token);

			sessionStorage.setItem("token", token);

			// Obtenir l'utilisateur
			const user = await this.dispatch("getUser", process.env.VUE_APP_API_URL + "/user/" + username);

			// Obtenir la clé d'authentification
			var clé = générerAuthKey(user, token, persister ? 0 : (Math.floor(Date.now()/1000 + parseInt(process.env.VUE_APP_API_AUTH_KEY_TTL))))

			const authKey = await postAuthKey( {url: user.liens.clés, clé: clé}, token );

			const storage = persister ? localStorage : sessionStorage;
			storage.setItem("username", username);
			storage.setItem("authKey_nom", authKey.nom);
			storage.setItem("authKey_secret", authKey.clé.secret);
		})());
	},

	async setAuthentificationEnCours({ commit, state }, état){
		commit("updateAuthentificationEnCours", état);
	},
	
	async inscription({ commit, state }, params) {
		const urlAuth = params.urlInscription;
		const nom_utilisateur = params.nom_utilisateur;
		const mdp = params.mdp;

		return valider(commit, authentifierApi(urlAuth, nom_utilisateur, mdp));
	},
	
	async getUser({ commit, state }, urlUser) {
		return valider(
			commit,
			getToken({ commit, state })
				.then((token) => getUserApi(urlUser, token))
				.then((user) => {
					commit("setUser", user);
					return user;
				}),
		);
	},

	async getQuestion({ commit, state }, urlQuestion) {
		return valider(
			commit,
			getToken({ commit, state })
				.then((token) => getQuestionApi(urlQuestion, token))
				.then((question) => {
					commit("setQuestion", question);
					return question;
				}),
		);
	},
	//getListeAvancements
	async getAvancement({ commit, state }, params) {
		return valider(
			commit,
			getToken({ commit, state })
				.then((token) => getAvancementApi(params.url, token))
				.then((avancement) => {
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
					} else {
						var ebauches = this.state.question.ebauches;
						if (ebauches[params.lang_défaut]) {
							tentative = ebauches[params.lang_défaut];
						} else {
							tentative = ebauches[Object.keys(ebauches)[0]];
						}
					}

					commit("setTentative", tentative);
					commit("updateRetroaction", tentative);
					return avancement;
				}),
		);
	},

	async postAvancement({ commit, state }, params) {
		return valider(
			commit,
			getToken({ commit, state })
				.then((token) => postAvancementApi(params, token))
				.then((avancement) => {
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
						var ebauches = this.state.question.ebauches;
						if (ebauches[params.lang_défaut]) {
							tentative = ebauches[params.lang_défaut];
						} else {
							tentative = ebauches[Object.keys(ebauches)[0]];
						}
					}

					commit("setTentative", tentative);
					commit("updateRetroaction", tentative);
					return avancement;
				}),
		);
	},

	async getTentative({ commit, state }, urlTentative) {
		return valider(
			commit,
			getToken({ commit, state })
				.then((token) => getTentativeApi(urlTentative, token))
				.then((tentative) => {
					commit("setTentative", tentative);
					commit("updateRetroaction", tentative);
					return tentative;
				}),
		);
	},

	async soumettreTentative({ commit, state }, params) {
		commit("updateEnvoieTentativeEnCours", true);

		params.urlTentative = this.state.avancement.liens.tentatives;
		return valider(
			commit,
			getToken({ commit, state })
				.then((token) => postTentative(params, token))
				.then((retroactionTentative) => {
					commit("updateRetroaction", retroactionTentative);
					commit("updateEnvoieTentativeEnCours", false);

					this.state.avancement.tentatives.unshift(retroactionTentative);
					if (this.state.avancement.état != 2) {
						this.state.avancement.état = retroactionTentative.réussi ? 2 : 1;
					}

					if( this.state.cb_succes && this.state.cb_succes_params ) {
						callbackGrade(this.state.cb_succes, {
							...this.state.cb_succes_params,
							uri: this.state.uri,
							token: this.state.token,
						});
					}
				})
				.catch((e) => {
					commit("updateEnvoieTentativeEnCours", false);
					throw(e);
				}),
		);
	},

	async mettreAjourSauvegarde({ commit, state }) {
		const params = {
			url: this.state.avancement.liens.sauvegardes,
			code: this.state.tentative.code,
			langage: this.state.tentative.langage,
		};

		return valider(
			commit,
			getToken({ commit, state })
				.then((token) => postSauvegardeApi(params, token))
				.then((sauvegarde) => {
					if (sauvegarde) {
						commit("setSauvegarde", sauvegarde);
						return sauvegarde;
					}
				}),
		);
	},

	mettreAjourCode({ commit, state }, code) {
		commit("updateCodeTentative", code);
	},

	mettreAjourLangageSelectionne({ commit, state }, langage) {
		commit("updateLangageTentative", langage);
	},

	réinitialiser({ commit, state }, langage_p) {
		const langage = langage_p ?? this.state.tentative.langage;
		commit("setTentative", {
			langage: langage,
			code: this.state.question.ebauches[langage].code,
		});

		commit("updateRetroaction", null);
	},

	setToken({ commit, state }, token) {
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

	setUri({ commit, state }, uri) {
		commit("setUri", uri);
	},

	setLangageDéfaut({ commit, state }, langageDéfaut) {
		commit("setLangageDéfaut", langageDéfaut);
	},

	setDémo({ commit, state }, val) {
		commit("setDémo", val);
	},

	setCallbackSucces({ commit, state }, cb_succes) {
		commit("setCallbackSucces", cb_succes);
	},

	setCallbackSuccesParams({ commit, state }, cb_succes_params) {
		commit("setCallbackSuccesParams", cb_succes_params);
	},

	setCallbackAuth({ commit, state }, cb_auth) {
		commit("setCallbackAuth", cb_auth);
	},

	setCallbackAuthParams({ commit, state }, cb_auth_params) {
		commit("setCallbackAuthParams", cb_auth_params);
	},

	deleteToken({ commit, state }) {
		commit("setToken", null);
		commit("setUsername", null);
	},

	setUsername({ commit, state }, username) {
		commit("setUsername", username);
	},

	setAuthentificationErreurHandler({ commit, state }, authentificationErreurHandler ){
		commit("setAuthentificationErreurHandler", authentificationErreurHandler);
	},
};






