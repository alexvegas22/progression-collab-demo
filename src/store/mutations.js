export const mutations = {
    setAvancement (state, avancement) {
        state.avancement = avancement
    },
    setTentative (state, {tentative, resultats}) {
        let listeEbauches = []
        const ebauche = {code: tentative.code, langage: "python"}
        listeEbauches[ebauche.langage] = ebauche
        state.ebauches = listeEbauches
        let resultatsConvert = []
        resultats.forEach((resultat)=>resultatsConvert.push({id:resultat.id, attributes:resultat.data}))
        state.retroactionTentative = {attributes:{feedback:tentative.feedback, tests_réussis:tentative.tests_réussis}, included: resultatsConvert }
    },
    updateRetroaction (state, retroactionTentative) {
        console.log(retroactionTentative)
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
    setEbauches(state, ebauches) {
        state.ebauches = ebauches;
    },
}
