import { getQuestionApi, getTestsAPI, getAvancementAPI, getEbaucheApi, getTentativeApi, postTentative } from "../services/index.js";

export default {
  async getQuestion({ commit, dispatch }) {
    try {
      const question = await getQuestionApi(); // Retourner ici l'objet «question» directement
      commit("setQuestion", question.data);
      commit("setTests", question.included);
      // Les lignes (ci-dessous) seront peut-être à supprimer ou changer plus tard
      await dispatch('getAvancement', question.data.links.avancement)
      await dispatch("getEbauche", question.data.relationships.ebauches.links.related);
    } catch (error) {
      console.log(error);
    }
  },
  async getAvancement({ commit }, urlAvancement) {
    try {
      const avancement = await getAvancementAPI(urlAvancement);
      commit('setAvancement', avancement)
    } catch (error) {
      console.log(error)
    }
  },
  async getEbauche({ commit }, ebaucheUrl) {
    try {
      const ebauche = await getEbaucheApi(ebaucheUrl);
      commit("setEbauche", ebauche);
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
