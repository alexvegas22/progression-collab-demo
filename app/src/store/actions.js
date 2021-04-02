import {
  getQuestionApi,
  getTentativeApi,
  getAvancementApi,
  postTentative,
} from "@/services/index.js";

export default {
  async getUser({ commit }) {
    try {
      const user = await getUserApi();
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
    } catch (error) {
      console.log(error);
    }
  },

  async getAvancement({ commit }, params ) {
    try {
      const avancement = await getAvancementApi(params.username, params.uri);
      commit("setAvancement", avancement);
    } catch (error) {
      console.log(error);
    }
  },

  async getTentative({ commit }, urlTentative) {
    try {
      const tentative = await getTentativeApi(urlTentative);
      commit("setTentative", tentative);
    } catch (error) {
      console.log(error);
    }
  },
  async soumettreTentative({ commit }, params) {
    commit("updateEnvoieTentativeEnCours", true);
    commit("updateMsgAPIEnvoiTentative", "Envoie de la tentative en cours..");
    try {
      var retroactionTentative = await postTentative(params);
      commit("updateRetroaction", retroactionTentative);
      commit("updateMsgAPIEnvoiTentative", null);
      commit("updateEnvoieTentativeEnCours", false);
    } catch (error) {
      commit("updateMsgAPIEnvoiTentative", "Impossible de communiquer avec le serveur");
      commit("updateEnvoieTentativeEnCours", false);
      console.log(error);
    }
  },
};
