import {postTentative, getTestsAPI,} from '../services'
import {getData} from '../services/request_services';



export default {
    async getTests({ commit }) {
        try {
            const tests = await getTestsAPI();
            commit("setTests", tests);
        } catch (error) {
            console.log(error);
        }
    },
    async envoyerTentative({commit}, langage, code) {
        commit('updateEnvoieTentativeEnCours', true)
        commit('updateMsgAPIEnvoiTentative', "Envoie de la tentative en cours..")
        try {
            //const retroactionTentative = await postTentative({langage}, {code});
            const reponseAPI= await postTentative({langage}, {code})
            console.log(reponseAPI)
            commit('updateRetroaction', reponseAPI)
            commit('updateMsgAPIEnvoiTentative', null)
            commit('updateEnvoieTentativeEnCours', false)
        } catch (error) {
            commit('updateMsgAPIEnvoiTentative', "Impossible de comminuquer avec le super server")
            commit('updateEnvoieTentativeEnCours', false)
            console.log(error)
        }

    },
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
