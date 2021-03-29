import { createStore } from 'vuex'
import { mutations } from './mutations'
import actions from './actions'

export default createStore({
    state: {
        question: {},
        retroactionTentative:Object,
        msgAPIEnvoiTentative:null,
        envoiTentativeEnCours:false,
        avancement: {},
        tentative: {},
    },
    actions,
    mutations
})

