import {getQuestion} from '../services'
import { getEbaucheApi } from "../services/index";

export default {
  async getQuestion({commit, dispatch}, url) {
    try{
      commit('setQuestion', await getQuestion(url))

      await dispatch('getEbauche');
    } catch (error){
      console.log(error)
    }
  },
  async getEbauche({ commit, state }) {
    try {
      const ebaucheUrl = state.question.relationships.ebauches.links.related

      commit("setEbauche", await getEbaucheApi(ebaucheUrl));
    } catch (error) {
      console.log(error);
    }
  }
}
