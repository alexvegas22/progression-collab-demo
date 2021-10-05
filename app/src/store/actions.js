import {
	getUserApi,
	getQuestionApi,
	getTentativeApi,
	getAvancementApi,
	postTentative,
	postAvancementApi,
	postSauvegardeApi,
	callbackGrade,
} from "@/services/index.js";

import jwt_decode from "jwt-decode";

const valider = function (commit, promesse) {
	promesse
		.then((résultat) => {
			commit("setErreurs", null);
		})
		.catch((erreur) => {
			commit("setErreurs", erreur);
			throw erreur;
		});

	return promesse;
};

export default {
	async getUser({ commit }, urlUser) {
		return getUserApi(urlUser, this.state.token).then((user) => {
			commit("setUser", user);
		});
	},

	async getQuestion({ commit }, urlQuestion) {
		valider(
			commit,
			getQuestionApi(urlQuestion, this.state.token).then((question) => {
				commit("setQuestion", question);
			}),
		);
	},

	async getAvancement({ commit }, params) {
		valider(
			commit,
			getAvancementApi(params.url, this.state.token).then((avancement) => {
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
			}),
		);
	},

	async postAvancement({ commit }, params) {
		valider(
			commit,
			postAvancementApi(params, this.state.token).then((avancement) => {
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
			}),
		);
	},

	async getTentative({ commit }, urlTentative) {
		valider(
			commit,
			getTentativeApi(urlTentative, this.state.token).then((tentative) => {
				commit("setTentative", tentative);
				commit("updateRetroaction", tentative);
			}),
		);
	},

	async soumettreTentative({ commit }, params) {
		commit("updateEnvoieTentativeEnCours", true);
		commit("updateMsgReponseApi", "traitementEnCours");

		params.urlTentative = this.state.avancement.liens.tentative;
		valider(
			commit,
			postTentative(params, this.state.token)
				.then((retroactionTentative) => {
					commit("updateRetroaction", retroactionTentative);

					this.state.avancement.tentatives.unshift(retroactionTentative);
					if (this.state.avancement.état != 2) {
						this.state.avancement.état = retroactionTentative.réussi ? 2 : 1;
					}

					callbackGrade(
						this.state.cb_succes,
						this.state.cb_succes_params,
						this.state.token).catch((erreur)=>{
							//Afficher un message
							commit("setErreurs", erreur);
						}
							
						);
					
					commit("updateMsgReponseApi", null);
				})
				.catch((erreur) => {
					console.log(erreur);
					commit("updateMsgReponseApi", "erreurServeur");
				})
				.finally(() => {
					commit("updateEnvoieTentativeEnCours", false);
				}),
		);
	},

	async mettreAjourSauvegarde({ commit }) {
		const params = {
			url: this.state.avancement.liens.sauvegardes,
			code: this.state.tentative.code,
			langage: this.state.tentative.langage,
		};

		return valider(
			commit,
			postSauvegardeApi(params, this.state.token).then((sauvegarde) => {
				if (sauvegarde) {
					commit("setSauvegarde", sauvegarde);
				}
			}),
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
		} );

		commit("updateRetroaction", null);
	},

	setToken({ commit }, token) {
		const token_décodé = jwt_decode(token);

		if (token_décodé.username) {
			commit("setToken", token);
			commit("setUsername", token_décodé.username);
		}
	},

	setUri({commit}, uri) {
		commit("setUri", uri);
	},
	
	setLangageDéfaut({commit}, langageDéfaut) {
		commit("setLangageDéfaut", langageDéfaut);
	},
	
	setCallbackSucces({commit}, cb_succes) {
		commit("setCallbackSucces", cb_succes);
	},
	
	setCallbackSuccesParams({commit}, cb_succes_params) {
		commit("setCallbackSuccesParams", cb_succes_params);
	},
	
	deleteToken({ commit }) {
		commit("setToken", null);
		commit("setUsername", null);
	},

	setUsername({ commit }, username) {
		commit("setUsername", username);
	},
};
