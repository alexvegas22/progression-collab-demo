export const mutations = {
    setUser(state, user) {
        state.user = user
    },
    setAvancement(state, avancement) {
        state.avancement = avancement
    },
    /*ajouterTentativeAvancement(state, tentative) {
        state.avancement.tentatives.push(tentative)
    },*/
    setTentative(state, tentative) {
        let listeEbauches = []
        const ebauche = { code: tentative.code, langage: tentative.langage }
        listeEbauches[ebauche.langage] = ebauche
        state.question.ebauches = listeEbauches
        state.retroactionTentative = tentative
    },
    updateRetroaction(state, retroactionTentative) {
        state.retroactionTentative = retroactionTentative;
    },
    updateMsgAPIEnvoiTentative(state, msg) {
        state.msgAPIEnvoiTentative = msg
    },
    updateEnvoieTentativeEnCours(state, bool) {
        state.envoiTentativeEnCours = bool
    },
    updateCodeEtLangageTentative(state, data) {
        state.codeTentative = data.code
        state.langageTentative = data.langage
    },
    /*updateAvancement(state, retroactionTentative) {
        console.log("Nb Tentatives avant = "+state.avancement.tentatives.length)
        const newAvancement = state.avancement
        retroactionTentative.resultats = []
        newAvancement.tentatives.push(retroactionTentative)
        if (newAvancement.état != 2) {
            newAvancement.état = (retroactionTentative.réussi) ? 2 : 1
        }

        state.avancement = newAvancement
        console.log("Nb Tentatives après = "+state.avancement.tentatives.length)
    },*/
    setTests(state, tests) {
        state.question.tests = tests;
    },
    setQuestion(state, question) {
        state.question = question;
    },
    setEbauches(state, ebauches) {
        state.question.ebauches = ebauches
    },
    setAfficherRetroaction(state, boolValue) {
        state.afficherRetroaction = boolValue
    },
    setAfficherTentative(state, boolValue) {
        state.afficherTentative = boolValue
    },
}