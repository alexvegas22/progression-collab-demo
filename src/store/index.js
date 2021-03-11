import { createStore } from 'vuex'
import { mutations } from './mutations'
import actions from './actions'

export default createStore({
    state: {
        retroactionTentative:Object,
        msgAPIEnvoiTentative:String,
        envoiTentativeEnCours:false
    },
    actions,
    mutations
})
