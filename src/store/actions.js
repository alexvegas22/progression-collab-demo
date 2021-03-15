
import {getData, postData} from '../services/request_services';



export default {
  async getAvancement({commit}, urlAvancement) {
    try{
      const avancement = await getData(urlAvancement);
      commit('setAvancement', avancement)
    }catch (error){
      console.log(error)
    }
  },
  async getQuestion({ commit, dispatch, state }, url) {

    try{
      commit('setQuestion', await getData(url))
      await dispatch('getEbauche', state.question.relationships.ebauches.links.related);
      await dispatch('getAvancement', state.question.links.avancement)

    } catch (error){
      console.log(error)
    }
  },
  async getTentative({commit}, avancementTentative) {
    console.log(avancementTentative)
    try{
      const tentative = await getData(avancementTentative);
      const resultatsId = tentative.résultats;
      let resultats= [];
      resultatsId.forEach( async (resultat) =>
          resultats.push(await getData(tentative.lienResultat+resultat.id)))

      const tentativeComplete = {tentative: tentative, resultats:resultats}
      //TODO : supprimer le console.log pour demo seulement affiche le composant qui est mis dans le store.
      console.log(tentativeComplete)
      commit('setTentative', tentativeComplete)
    } catch (error){
      console.log(error)
    }
  },
  async getEbauche({ commit }, ebaucheUrl) {
    try {
      commit("setEbauche", await getData(ebaucheUrl));
    } catch (error) {
      console.log(error);
    }
  },

}