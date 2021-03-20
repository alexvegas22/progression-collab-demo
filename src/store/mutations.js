export const mutations = {


    setAvancement (state, avancement) {
        state.avancement = avancement
    },
    setTentative (state, {tentative, resultats}) {
        state.tentativeAffiche = {tentative, resultats}
        //Le langage "python" est codé en dur pour le moment car le composant éditeur ne gère pas d'autres langages
        //TODO
        //state.ebauche = {attributes: { code: tentative.tentative.data.code, langage: tentative.tentative.data.langage}}
        state.ebauche = {attributes: { code: tentative.data.code, langage: "python"}}
        let resultatConvert = []
        resultats.forEach((resultat)=>resultatConvert.push({id:resultat.id, attributes:resultat.data}))
        state.retroactionTentative = {attributes:{feedback:"N/A", tests_réussis:1}, included: resultatConvert }
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
