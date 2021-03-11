import {getAvancementApi} from '../services'

export default {
  async getAvancement({commit}, questionAvancement) {
    try{
      const avancement = await getAvancementApi(questionAvancement);
      commit('setAvancement', avancement)
    } catch (error){
      console.log(error)
    }
  }
}