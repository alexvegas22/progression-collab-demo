import {getQuestion} from '../services'

export default {
  async getQuestion({commit}, url) {
    try{
      const question = await getQuestion(url);
      commit('setQuestion', question)
    } catch (error){
      console.log(error)
    }
  }
}

