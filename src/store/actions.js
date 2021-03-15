<<<<<<< HEAD
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
=======
import { getEbaucheApi } from "../services/index";

export default {
  async getEbauche({ commit }, urlEbauche) {
    try {
      const ebauche = await getEbaucheApi(urlEbauche);
      commit("setEbauche", ebauche);
    } catch (error) {
      console.log(error);
    }
  },
};
>>>>>>> 821f0f161239466d66227a64e807fdda6a11daba
