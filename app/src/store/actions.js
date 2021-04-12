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
			commit("setTests", question.tests);
			commit("setEbauches", question.ebauches);
			commit("setAfficherTentative", false);
			commit("setAfficherRetroaction", false);
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
			commit("setAfficherTentative", true);
			commit("setAfficherRetroaction", true);
		} catch (error) {
			console.log(error);
		}
	},
	async soumettreTentative({ commit }, params) {
		commit("setAfficherRetroaction", true);
		commit("updateEnvoieTentativeEnCours", true);
		commit("updateMsgAPIEnvoiTentative", "Traitement de la tentative en cours...");
		try {
			var retroactionTentative = await postTentative(params);
			commit("updateRetroaction", retroactionTentative);
			commit("updateMsgAPIEnvoiTentative", null);
			commit("updateEnvoieTentativeEnCours", false);
			commit("updateAvancement", retroactionTentative);
		} catch (error) {
			commit(
				"updateMsgAPIEnvoiTentative",
				"Impossible de communiquer avec le serveur"
			);
			commit("updateEnvoieTentativeEnCours", false);
			console.log(error);
		}
	},
	raffraichirValeursEbauches({ commit }, data) {
		commit("updateCodeEtLangageTentative", data);
	},
};
