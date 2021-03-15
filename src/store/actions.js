import {getDataFromApi} from '../services'

export default {
  async getAvancement({commit}, questionAvancement) {
    try{
      const avancement = await getDataFromApi(questionAvancement);
      commit('setAvancement', avancement)
    } catch (error){
      console.log(error)
    }
  },
  async getTentative({commit}, avancementTentative) {
    try{
      const tentative = await getDataFromApi(avancementTentative);
      const resultatsId = tentative.résultats;
      let resultats= [];
      resultatsId.forEach( async (resultat) =>
          resultats.push(await getDataFromApi(tentative.lienResultat+resultat.id)))

      const tentativeComplete = {tentative: tentative, resultats:resultats}
      //TODO : supprimer le console.log pour demo seulement affiche le composant qui est mis dans le store.
      console.log(tentativeComplete)
      commit('setTentative', tentativeComplete)
    } catch (error){
      console.log(error)
    }
  }


}