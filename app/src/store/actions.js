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
const valider = async function(promesse){
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

	return {
		nom: clé_id,
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

	async setErreurs({ commit }, erreurs) {
		commit("setErreurs", erreurs);
	},

	async getConfigServeur({commit }, urlConfig){
		return valider( async function() {
			const config = await getConfigServeurApi(urlConfig);

			commit("setConfigServeur", config);
			return config;
		}()
		);
	},

	async authentifier({ commit }, params) {
		const urlAuth = process.env.VUE_APP_API_URL + (params.inscrire ? "/inscription" : "/auth");
		const username = params.username;
		const password = params.password;
		const persister = params.persister;
		const domaine = params.domaine;
		commit("updateAuthentificationEnCours", true);

		return valider( async function() {
			const token = await authentifierApi(urlAuth, username, password, domaine)

			commit("setUsername", username);
			commit("setToken", token);

			sessionStorage.setItem("token", token);

			// Obtenir l'utilisateur
			const user = await getUserApi( process.env.VUE_APP_API_URL + "/user/" + username, token);

			// Obtenir la clé d'authentification
			var clé = générerAuthKey(user, token, persister ? 0 : (Math.floor(Date.now()/1000 + parseInt(process.env.VUE_APP_API_AUTH_KEY_TTL))))

			const authKey = await postAuthKey( {url: user.liens.clés, clé: clé}, token );

			const storage = persister ? localStorage : sessionStorage;
			storage.setItem("username", username);
			storage.setItem("authKey_nom", authKey.nom);
			storage.setItem("authKey_secret", authKey.clé.secret);

			return token;
		}()
		);
	},

	async setAuthentificationEnCours({ commit }, état){
		commit("updateAuthentificationEnCours", état);
	},

	async inscription({ commit }, params) {
		const urlAuth = params.urlInscription;
		const nom_utilisateur = params.nom_utilisateur;
		const mdp = params.mdp;

		return valider(commit, authentifierApi(urlAuth, nom_utilisateur, mdp));
	},
		
	async getUser({ commit, state }, urlUser) {
		return valider( async function() {
			const token = await getToken({ commit, state });
			const user = await getUserApi(urlUser, token);

			commit("setUser", user);
			return user;
		}()
		);
	},

	async getQuestion({ commit, state }, urlQuestion) {
		return valider( async function() {
			const token = await getToken({ commit, state });
			const question = await getQuestionApi(urlQuestion, token);

			commit("setQuestion", question);
			return question;
		}()
		);
	},

	async getAvancement({ commit, state }, params) {
		return valider(
			async function() {
				const token = await getToken({ commit, state });
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
			}()
		);
	},

	async postAvancement({ commit, state }, params) {
		return valider( async function() {
			const token = await getToken({ commit, state });
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
		}()
		);
	},

	async getTentative({ commit, state }, urlTentative) {
		return valider( async function() {
			const token = await getToken({ commit, state });
			const tentative = await getTentativeApi(urlTentative, token);

			commit("setTentative", tentative);
			commit("updateRetroaction", tentative);
			return tentative;
		}()
		);
	},

	async soumettreTentative({ commit, state }, params) {
		commit("updateEnvoieTentativeEnCours", true);

		params.urlTentative = state.avancement.liens.tentatives;
		commit("updateRetroaction", null);

		return valider( async function() {
			try{
				const token = await getToken({ commit, state });
				const retroactionTentative = await postTentative(params, token);

				commit("updateRetroaction", retroactionTentative);
				commit("updateEnvoieTentativeEnCours", false);

				state.avancement.tentatives.unshift(retroactionTentative);
				if (state.avancement.état != 2) {
					state.avancement.état = retroactionTentative.réussi ? 2 : 1;
				}

				if( state.cb_succes && state.cb_succes_params ) {
					callbackGrade(state.cb_succes, {
						...state.cb_succes_params,
						uri: state.uri,
						token: state.token,
					});
				}
				return retroactionTentative;
			}
			catch(e) {
				commit("updateEnvoieTentativeEnCours", false);
				throw(e);
			}
			
		}()
		);
	},

	async mettreAjourSauvegarde({ commit, state }) {
		const params = {
			url: state.avancement.liens.sauvegardes,
			code: state.tentative.code,
			langage: state.tentative.langage,
		};

		return valider( async function() {

			const token = await getToken({ commit, state });
			const sauvegarde = await postSauvegardeApi(params, token);

			if (sauvegarde) {
				commit("setSauvegarde", sauvegarde);
				return sauvegarde;
			}
		}()
		);
	},

	mettreAjourCode({ commit }, code) {
		commit("updateCodeTentative", code);
	},

	mettreAjourEbauche({ commit }, params) {
		commit("updateCodeEbauche", params);
	},

	setModeCréation({ commit }, modeCréation) {
		commit("setModeCréation", modeCréation);
	},
	
	mettreAJourLangageSelectionne({ commit }, langage) {
		commit("updateLangageTentative", langage);
	},

	mettreAJourLangageSelectionneÉbauche({ commit }, langage) {
		commit("updateLangageSelectionneÉbauche", langage);
	},

	réinitialiser({ commit }, langage_p) {
		const langage = langage_p ?? this.state.tentative.langage;
		commit("setTentative", {
			langage: langage,
			code: this.state.question.ebauches[langage].code,
		});
		commit("updateRetroaction", null);
	},

	réinitialiserÉbaucheTemporaire({ commit }, langage){
		commit("setTentative", {
			langage: langage,
			code: this.state.sauvegardesTemporaires.get(langage),
		});
		if(!Object.keys(this.state.question.ebauches).includes(langage)){
			commit("addÉbauche",{
				langage: langage,
				code: this.state.sauvegardesTemporaires.get(langage),
			});
		}
	},

	réinitialiserÉbauche({ commit }, langage) {
		if (!this.state.question.ebauches[langage]){
			commit("setTentative", {
				langage: langage,
				code: "",
			});
		} else {
			commit("setTentative", {
				langage: langage,
				code: this.state.question.ebauches[langage].code,
			});
		}
		commit("updateRetroaction", null);
	},

	sauvegardeTemporaire({ commit }){
		commit("setSauvegardeTemporaire", {
			langage: this.state.langageSélectionné,
			code: this.state.tentative.code,
		});
	},
	
	ajouterLangagesSupportés({ commit }, langages_p) {
		commit("setLangagesSupportés", langages_p);
	},

	ajouterLangageÉbauche({ commit }, langages_p) {
		commit("setLangagesÉbauches", langages_p);
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

	setModeÉdition({ commit }, edit) {
		commit("setModeÉdition", edit);
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

	setUsername({ commit }, username) {
		commit("setUsername", username);
	},

	setAuthentificationErreurHandler({ commit }, authentificationErreurHandler ){
		commit("setAuthentificationErreurHandler", authentificationErreurHandler);
	},

	setThèmeSombre({ commit }, val) {
		commit("setThèmeSombre", val);
	},
};
