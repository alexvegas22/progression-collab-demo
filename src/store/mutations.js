export const mutations = {


    setAvancement (state, avancement) {
        state.avancement = avancement
    },
    setTentative (state, {tentative, resultats}) {
        //state.tentativeAffiche = {tentative, resultats}
        state.tentative = {tentative, resultats}
        //Le langage "python" est codé en dur pour le moment car le composant éditeur ne gère pas d'autres langages
        //TODO
        //state.ebauches = [{code: tentative.code, langage: tentative.langage}]
        state.ebauches = [{code: tentative.code, langage: "python"}]
        let resultatsConvert = []
        resultats.forEach((resultat)=>resultatsConvert.push({id:resultat.id, attributes:resultat.data}))
        state.retroactionTentative = {attributes:{feedback:"N/A", tests_réussis:1}, included: resultatsConvert }
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
