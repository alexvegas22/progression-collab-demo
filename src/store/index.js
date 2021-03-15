import { createStore } from 'vuex'
import { mutations } from './mutations'
import actions from './actions'

export default createStore({
    state: {
        question: {},
        ebauche: {},
        tests: Promise,
        retroactionTentative:Object,
        msgAPIEnvoiTentative:null,
        envoiTentativeEnCours:false
    },
    actions,
    mutations
})
