export const mutations = {
	setUser(state, user) {
		state.user = user;
	},
	setAvancement(state, avancement) {
		state.avancement = avancement;
		if(avancement.tentatives.length>0){
			//state.tentative = avancement.tentatives[0];
			state.tentative = avancement.tentatives[avancement.tentatives.length - 1];
		}
	},
	setTentative(state, tentative) {
		state.tentative = tentative;
	},
	updateRetroaction(state, retroactionTentative) {
		state.retroactionTentative = retroactionTentative;
	},
	updateMsgAPIEnvoiTentative(state, msg) {
		state.msgAPIEnvoiTentative = msg;
	},
	updateEnvoieTentativeEnCours(state, bool) {
		state.envoiTentativeEnCours = bool;
	},
	updateCodeEtLangageTentative(state, data) {
		state.codeTentative = data.code;
		state.langageTentative = data.langage;
	},
	setTests(state, tests) {
		state.question.tests = tests;
	},
	setQuestion(state, question) {
		state.question = question;
	},
	setEbauches(state, ebauches) {
		state.question.ebauches = ebauches;
	},
	setAfficherRetroaction(state, boolValue) {
		state.afficherRetroaction = boolValue;
	},
	setAfficherTentative(state, boolValue) {
		state.afficherTentative = boolValue;
	},
};
