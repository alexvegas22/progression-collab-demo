export const mutations = {
    setUser(state, user) {
        state.user = user
    },
    setAvancement(state, avancement) {
        state.avancement = avancement
        /*avancement.tentatives.forEach((item) => {
            state.avancement.tentatives.push(item);
        });*/
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
    updateRetroaction(state, retroaction) {
        /* let a = state.avancement
         let b = state.avancement.tentatives
         let c = state.avancement.état*/
        state.retroactionTentative = retroaction
        //retroaction.resultats = []
        /*let tentatives = []
        tentatives = state.avancement.tentatives
        tentatives.push(retroaction)*/
        //state.avancement.tentatives.push(retroaction)
        //state.avancement.tentatives = tentatives

        //let avancementActuel = state.avancement
        //retroaction.resultats = []
        //avancementActuel.tentatives.push(retroaction)
        /*if (state.avancement.état != 2) {
            state.avancement.état = (retroaction.réussi) ? 2 : 1
        }*/
        //state.avancement = avancementActuel
        //state.avancement.tentatives = avancementActuel.tentatives
        /*console.log("nb tentative avant VS après  "+b.length +" | " +state.avancement.tentatives.length)
        console.log("state.avancement est comme avant  "+ (state.avancement == a))
        console.log("state.avancement.tentatives est comme avant  "+ (state.avancement.tentatives == b))
        console.log("state.avancement.état est comme avant  "+ (state.avancement.état == c))
        console.log("juste pour vérifier (avancement === tentatives)?   "+ (b == a))*/
    },
    /*updateAvancement(state, data) {
        let a = state.avancement
        state.avancement = data
        console.log("state.avancement est comme avant  : "+ (state.avancement == a))
        /*console.log("Nb Tentatives avant = "+state.avancement.tentatives.length)
        const newAvancement = state.avancement
        retroactionTentative.resultats = []
        newAvancement.tentatives.push(retroactionTentative)
        if (newAvancement.état != 2) {
            newAvancement.état = (retroactionTentative.réussi) ? 2 : 1
        }

        state.avancement = newAvancement
        console.log("Nb Tentatives après = "+state.avancement.tentatives.length)
    },*/
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