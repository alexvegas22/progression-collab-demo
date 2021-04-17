export const mutations = {
	setUser(state, user) {
		state.user = user;
	},
	setAvancement(state, avancement) {
		state.avancement = avancement;
		if (avancement.tentatives.length > 0) {
			state.tentative = avancement.tentatives[0];
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
	updateCodeTentative(state, code) {
		state.tentative.code = code;
	},
	updateLangageTentative(state, langage) {
		state.tentative.langage = langage;
	},
	setTests(state, tests) {
		state.question.tests = tests;
	},
	setQuestion(state, question) {
		state.question = question;
	},
	setEbauches(state, ebauches) {
		state.question.ebauches = ebauches;
		if (!state.tentative) {
			state.tentative = state.question.ebauches[Object.keys(state.question.ebauches)[0]];
		}
	},
	setAfficherRetroaction(state, boolValue) {
		state.afficherRetroaction = boolValue;
	},
	setAfficherTentative(state, boolValue) {
		state.afficherTentative = boolValue;
	}
};
