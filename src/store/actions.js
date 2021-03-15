import {getQuestion} from '../services'
import { getEbaucheApi } from "../services/index";

export default {
  async getQuestion({ commit, dispatch, state }, url) {
    try{
      commit('setQuestion', await getQuestion(url))

      await dispatch('getEbauche', state.question.relationships.ebauches.links.related);
    } catch (error){
      console.log(error)
    }
  },
  async getEbauche({ commit }, ebaucheUrl) {
    try {
      commit("setEbauche", await getEbaucheApi(ebaucheUrl));
    } catch (error) {
      console.log(error);
    }
  }
}
