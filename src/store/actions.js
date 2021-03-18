import { postTentative, getQuestion } from "../services/index.js";
import {getData} from '../services/request_services';

export default {
  async getQuestion({ commit, dispatch, state }, url) {
    try {
      const question = await getQuestion(url);
      commit("setQuestion", question.data);
      commit("setTests", question.included);
      await dispatch('getAvancement', question.data.links.avancement)
      await dispatch("getEbauche", question.data.relationships.ebauches.links.related);
    } catch (error) {
      console.log(error);
    }
  },
  async getAvancement({commit}, urlAvancement) {
    try{
        const avancement = await getData(urlAvancement);
        commit('setAvancement', avancement.data)
    }catch (error){
        console.log(error)
    }
},
  async getTentative({commit}, avancementTentative) {

      try{
          const tentative = await getData(avancementTentative);
          const resultatsId = tentative.data.résultats;
          let resultats= [];
          resultatsId.forEach( async (resultat) =>
              resultats.push(await getData(tentative.data.lienResultat+resultat.id)))

          const tentativeComplete = {tentative: tentative, resultats:resultats}
          //TODO : supprimer le console.log pour demo seulement affiche le composant qui est mis dans le store.
            console.log(tentativeComplete)
          commit('setTentative', tentativeComplete)
      } catch (error){
          console.log(error)
      }
  },

  async envoyerTentative({ commit }, langage, code) {
    commit("updateEnvoieTentativeEnCours", true);
    commit("updateMsgAPIEnvoiTentative", "Envoie de la tentative en cours..");
    try {
      //const retroactionTentative = await postTentative({langage}, {code});
      var reponseAPI = await postTentative({ langage }, { code });
      commit("updateRetroaction", reponseAPI);
      commit("updateMsgAPIEnvoiTentative", null);
      commit("updateEnvoieTentativeEnCours", false);
    } catch (error) {
      commit(
        "updateMsgAPIEnvoiTentative",
        "Impossible de comminuquer avec le super server"
      );
      commit("updateEnvoieTentativeEnCours", false);
      console.log(error);
    }
  },
  async getEbauche({ commit }, ebaucheUrl) {
    try {
        const ebauche = await getData(ebaucheUrl);
        commit("setEbauche", ebauche.data);
    } catch (error) {
        console.log(error);
    }
},

}
