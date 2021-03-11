import {postTentative} from '../services/index.js'

export default {
    async envoyerTentative({commit}, langage, code) {
        try {
            const retroactionTentative = await postTentative({langage}, {code});
            commit('updateRetroaction', retroactionTentative)
        } catch (error) {
            console.log(error)
        }
    }
}