export const mutations = {
	setErreurs(state, erreurs) {
		state.erreurs = erreurs;
	},

	setUser(state, user) {
		state.user = user;
	},

	setUsername(state, username){
		state.username = username;
	},
	
	setToken(state, token) {
		state.token = token;
	},
	
	setAvancement(state, avancement) {
		state.avancement = avancement;
	},
	setTentative(state, tentative) {
		state.tentative = tentative;
	},
	setQuestion(state, question) {
		state.question = question;
	},
	updateRetroaction(state, retroactionTentative) {
		state.retroactionTentative = retroactionTentative;
	},
	updateCodeTentative(state, code) {
		state.tentative.code = code;
	},
	updateLangageTentative(state, langage) {
		state.tentative.langage = langage;
	},
	updateMsgReponseApi(state, msg) {
		state.msgReponseApi = msg;
	},
	updateEnvoieTentativeEnCours(state, bool) {
		state.envoiTentativeEnCours = bool;
	},
	setSauvegarde(state, sauvegarde) {
		state.sauvegardes[sauvegarde.langage] = sauvegarde;
	},
	setSauvegardes(state, sauvegardes) {
		state.sauvegardes = sauvegardes;
	},
};
