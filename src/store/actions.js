import { getQuestionApi, getTestsAPI, getAvancementAPI, getEbaucheApi, getTentativeApi, postTentative } from "@/services/index.js";

export default {
  async getQuestion({ commit, dispatch }) {
    try {
      const question = await getQuestionApi();
      commit("setQuestion", question.contenu);
      commit("setTests", question.tests);
      commit("setEbauches", question.ebauches);
      commit("setAvancement", question.avancement);
    } catch (error) {
      console.log(error);
    }
  },
  /*async getAvancement({ commit }, urlAvancement) {
    try {
      const avancement = await getAvancementAPI(urlAvancement);
      commit('setAvancement', avancement)
    } catch (error) {
      console.log(error)
    }
  },*/
  /*async getEbauche({ commit }, ebaucheUrl) {
    try {
      const ebauche = await getEbaucheApi(ebaucheUrl);
      commit("setEbauches", ebauche);
    } catch (error) {
      console.log(error);
    }
  },*/
  async getTentative({ commit }, urlTentative) {
    try {
      const tentative = await getTentativeApi(urlTentative);
      commit('setTentative', tentative)
    } catch (error) {
      console.log(error)
    }
  },
  async soumettreTentative({ commit }, langage, code) {
    commit("updateEnvoieTentativeEnCours", true);
    commit("updateMsgAPIEnvoiTentative", "Envoie de la tentative en cours..");
    try {
      var retroactionTentative = await postTentative({ langage }, { code });
      commit("updateRetroaction", retroactionTentative);
      commit("updateMsgAPIEnvoiTentative", null);
      commit("updateEnvoieTentativeEnCours", false);
    } catch (error) {
      commit("updateMsgAPIEnvoiTentative", "Impossible de comminuquer avec le super server");
      commit("updateEnvoieTentativeEnCours", false);
      console.log(error);
    }
  },
}
