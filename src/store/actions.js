import {postTentative} from '../services/index.js'

export default {
    async envoyerTentative({commit}, langage, code) {
        commit('updateEnvoieTentativeEnCours', true)
        commit('updateMsgAPIEnvoiTentative', "Envoie de la tentative en cours..")
        try {
            //const retroactionTentative = await postTentative({langage}, {code});
            var reponseAPI= await postTentative({langage}, {code})
            commit('updateRetroaction', reponseAPI)
            commit('updateMsgAPIEnvoiTentative', null)
            commit('updateEnvoieTentativeEnCours', false)
        } catch (error) {
            commit('updateMsgAPIEnvoiTentative', "Impossible de comminuquer avec le super server")
            commit('updateEnvoieTentativeEnCours', false)
            console.log(error)
        }

    }
}