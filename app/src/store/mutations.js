export const mutations = {
    setUser (state, user) {
        state.user = user
    },
    setAvancement (state, avancement) {
        state.avancement = avancement
    },
    setTentative (state, {tentative, resultats}) {
        let listeEbauches = []
        const ebauche = {code: tentative.code, langage: tentative.langage}
        listeEbauches[ebauche.langage] = ebauche
        state.question.ebauches = listeEbauches
        state.retroactionTentative = {
            feedback_global: tentative.feedback, 
            tentative_reussie: tentative.réussi,
            tests_réussis: tentative.tests_réussis, 
            resultats: resultats
        }
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
        state.question.tests = tests;
    },
    setQuestion (state, question) {
        state.question = question;
    },
    setEbauches(state, ebauches) {
        state.question.ebauches = ebauches
    },
}
