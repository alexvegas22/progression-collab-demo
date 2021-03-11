import {getAvancementApi} from '../services'

export default {
  async getAvancement({commit}, questionAvancement) {
    try{
      const avancement = await getAvancementApi(questionAvancement);
      commit('setAvancement', avancement)
    } catch (error){
      console.log(error)
    }
  },
  async getTentative({commit}, avancementTentative) {
    try{
      const tentative = await getAvancementApi(avancementTentative);
      const tentativeProg = await getAvancementApi(tentative.lienTentativeProg)
      const tentativeComplete = {tentative: tentative, tentativeProg: tentativeProg}
      //TODO : supprimer le consoloe.log pour demo seulement affiche le composant qui est mis dans le store.
      console.log(tentativeComplete)
      commit('setTentative', tentativeComplete)
    } catch (error){
      console.log(error)
    }
  }


}