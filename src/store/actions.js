import {postTentative, getTestsAPI, getQuestion} from '../services/index.js'
import { getEbaucheApi } from "../services/index";

export default {
  async getTests({ commit }) {
    try {
      const tests = await getTestsAPI();
      commit("setTests", tests);
    } catch (error) {
      console.log(error);
    }
  },
    async getQuestion({ commit, dispatch, state }, url) {
        try{
            commit('setQuestion', await getQuestion(url))

            await dispatch('getEbauche', state.question.relationships.ebauches.links.related);
        } catch (error){
            console.log(error)
        }
    },
    async envoyerTentative({commit}, langage, code) {
        commit('updateEnvoieTentativeEnCours', true)
        commit('updateMsgAPIEnvoiTentative', "Envoie de la tentative en cours..")
        try {
            //const retroactionTentative = await postTentative({langage}, {code});
            var reponseAPI= await postTentative({langage}, {code})
            commit('updateRetroaction', reponseAPI)
            commit('updateMsgAPIEnvoiTentative', null)
            commit('updateEnvoieTentativeEnCours', false)
        } catch (error) {
            commit('updateMsgAPIEnvoiTentative', "Impossible de comminuquer avec le super server")
            commit('updateEnvoieTentativeEnCours', false)
            console.log(error)
        }

    }
}
