export const mutations = {


    setAvancement (state, avancement) {
        state.avancement = avancement
    },
    setTentative (state, tentative) {
        state.tentativeAffiche = tentative
    },
    updateRetroaction (state, retroactionTentative) {
        state.retroactionTentative = retroactionTentative;
    },
    updateMsgAPIEnvoiTentative(state, msg){
        state.msgAPIEnvoiTentative= msg
    },
    updateEnvoieTentativeEnCours(state, bool){
        state.envoiTentativeEnCours=bool
    },
    setTests(state, tests) {
        state.tests = tests;
    },
    setQuestion (state, question) {
        state.question = question;
    },
    setEbauche(state, ebauche) {
        state.ebauche = ebauche;
    },
}
