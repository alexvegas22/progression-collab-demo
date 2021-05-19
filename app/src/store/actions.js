import {
	getUserApi,
	getQuestionApi,
	getTentativeApi,
	getAvancementApi,
	postTentative,
	postAvancementApi,
	postSauvegardeApi,
} from "@/services/index.js";

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
		valider(
			commit,
			getUserApi(urlUser).then((user) => {
				commit("setUser", user);
			}),
		);
	},

	async getQuestion({ commit }, urlQuestion) {
		valider(
			commit,
			getQuestionApi(urlQuestion).then((question) => {
				commit("setQuestion", question);
			}),
		);
	},

	async getAvancement({ commit }, urlAvancement) {
		valider(
			commit,
			getAvancementApi(urlAvancement).then((avancement) => {
				commit("setAvancement", avancement);
				commit("setSauvegardes", avancement.sauvegardes);
			}),
		);
	},

	async postAvancement({ commit }, params) {
		valider(
			commit,
			postAvancementApi(params).then((avancement) => {
				commit("setAvancement", avancement);
				commit("setSauvegardes", avancement.sauvegardes);
			}),
		);
	},

	async getTentative({ commit }, urlTentative) {
		valider(
			commit,
			getTentativeApi(urlTentative).then((tentative) => {
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
			postTentative(params)
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
			postSauvegardeApi(params).then((sauvegarde) => {
				if (sauvegarde) {
					commit("setSauvegarde", sauvegarde);
				}
			}),
		);
	},

	initialiserUriQuestion({ commit }, uri) {
		commit("setUriQuestion", uri);
	},

	mettreAjourCode({ commit }, code) {
		commit("updateCodeTentative", code);
	},

	mettreAjourLangageSelectionne({ commit }, langage) {
		commit("updateLangageTentative", langage);
	},

	réinitialiser({ commit }, langage) {
		commit("updateCodeTentative", this.state.question.ebauches[langage].code);
		commit("updateLangageTentative", langage);
	},
};
