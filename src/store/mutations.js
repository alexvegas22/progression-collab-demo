export const mutations = {


    setAvancement (state, avancement) {
        state.avancement = avancement
    },
    setTentative (state, tentative) {
        state.tentativeAffiche = tentative
        //Le langage "python" est codé en dur pour le moment car le composant éditeur ne gère pas d'autres langages
        //TODO
        //state.ebauche = {attributes: { code: tentative.tentative.data.code, langage: tentative.tentative.data.langage}}
        state.ebauche = {attributes: { code: tentative.tentative.data.code, langage: "python"}}
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
    setEbauche(state, ebauche) {
        state.ebauche = ebauche;
    },
}
