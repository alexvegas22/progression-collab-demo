import { getQuestionApi, getTentativeApi, postTentative } from "@/services/index.js";

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
      //TODO: Le résultat d'un post à /tentative est la Tentative soumise et traitée. Ça devrait donc probablement être setTentative, ici.
      commit("updateRetroaction", retroactionTentative);
      commit("updateMsgAPIEnvoiTentative", null);
      commit("updateEnvoieTentativeEnCours", false);
    } catch (error) {
      commit("updateMsgAPIEnvoiTentative", "Impossible de communiquer avec le serveur");
      commit("updateEnvoieTentativeEnCours", false);
      console.log(error);
    }
  },
}
