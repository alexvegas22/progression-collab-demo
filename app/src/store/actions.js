import { getUserApi, getQuestionApi, getTentativeApi, getAvancementApi, postTentative } from "@/services/index.js";

export default {
	async getUser({ commit }, urlUser) {
		try {
			const user = await getUserApi(urlUser);
			commit("setUser", user);
		} catch (error) {
			console.log(error);
		}
	},
	async getQuestion({ commit }, urlQuestion) {
		try {
			const question = await getQuestionApi(urlQuestion);
			commit("setQuestion", question);
		} catch (error) {
			console.log(error);
		}
	},
	async getAvancement({ commit }, urlAvancement) {
		try {
			const avancement = await getAvancementApi(urlAvancement);
			commit("setAvancement", avancement);
		} catch (error) {
			console.log(error);
		}
	},
	async getTentative({ commit }, urlTentative) {
		try {
			const tentative = await getTentativeApi(urlTentative);
			commit("setTentative", tentative);
			commit("updateRetroaction", tentative);
		} catch (error) {
			console.log(error);
		}
	},
	async soumettreTentative({ commit }, params) {
		commit("updateEnvoieTentativeEnCours", true);
		commit("updateMsgAPIEnvoiTentative", "Traitement de la tentative en cours...");
		try {
			params.urlTentative = this.state.avancement.liens.tentative;
			var retroactionTentative = await postTentative(params);
			commit("updateRetroaction", retroactionTentative);

			this.state.avancement.tentatives.unshift(retroactionTentative);
			if (this.state.avancement.état != 2) {
				this.state.avancement.état = derniereTentative.réussi ? 2 : 1;
			}

			commit("updateMsgAPIEnvoiTentative", null);
			commit("updateEnvoieTentativeEnCours", false);
		} catch (error) {
			commit("updateMsgAPIEnvoiTentative", "Impossible de communiquer avec le serveur");
			console.log(error);
		}
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
