import {
	getUserApi,
	getQuestionApi,
	getTentativeApi,
	getAvancementApi,
	postTentative,
	postAvancementApi,
	postSauvegardeApi,
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

	async getAvancement({ commit }, urlAvancement) {
		valider(
			commit,
			getAvancementApi(urlAvancement, this.state.token).then((avancement) => {
				commit("setAvancement", avancement);
			}),
		);
	},

	async postAvancement({ commit }, params) {
		valider(
			commit,
			postAvancementApi(params, this.state.token).then((avancement) => {
				commit("setAvancement", avancement);
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
					commit("updateMsgReponseApi", null);
				})
				.catch((erreur) => {
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
		commit("updateCodeTentative", this.state.question.ebauches[langage].code);
		commit("updateLangageTentative", langage);
		commit("updateRetroaction", null);
	},

	setToken( { commit }, token ){
		const token_décodé = jwt_decode( token )

		if( token_décodé.user ){
			commit("setToken", token);
			commit("setUsername", token_décodé.user.username );
		}
	},

	deleteToken( { commit } ){
		commit("setToken", null);
		commit("setUsername", null);
	},
	
	setUsername( { commit }, username ){
		commit("setUsername", username );
	}
};
