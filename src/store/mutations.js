export const mutations = {
    updateRetroaction (state, retroactionTentative) {
        state.retroactionTentative = retroactionTentative;
    },
    updateMsgAPIEnvoiTentative(state, msg){
        state.msgAPIEnvoiTentative= msg
    },
    updateEnvoieTentativeEnCours(state, bool){
        state.envoiTentativeEnCours=bool
    }
}
