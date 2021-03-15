import {getQuestion} from '../services'
import { getEbaucheApi } from "../services/index";

export default {
  async getQuestion({commit}, url) {
    try{
      const question = await getQuestion(url);
      commit('setQuestion', await question)
    } catch (error){
      console.log(error)
    }
  },
  async getEbauche({ dispatch, commit }) {
    try {
      await dispatch('getQuestion')

      //state.question

      commit("setEbauche", await getEbaucheApi('http://localhost:3000/QuestionProg/cHJvZzEvbGVzX2ZvbmN0aW9uc18wMS9hcHBlbGVyX3VuZV9mb25jdGlvbl9wYXJhbcOpdHLDqWU=/relationships/ebauche'));
    } catch (error) {
      console.log(error);
    }
  }
}
