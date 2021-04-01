export const mutations = {
    setUser (state, user) {
        state.user = user
    },
    setAvancement (state, avancement) {
        state.avancement = avancement
    },
    setTentative (state, {tentative, resultats}) {
        let listeEbauches = []
        const ebauche = {code: tentative.code, langage: "python"}
        listeEbauches[ebauche.langage] = ebauche
        state.question.ebauches = listeEbauches
        let resultatsConvert = []
        resultats.forEach((resultat)=>resultatsConvert.push(resultat.data))
        state.retroactionTentative = {tests_réussis:tentative.tests_réussis, feedback_global:tentative.feedback, resultats:resultatsConvert }
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
