export const mutations = {
	setUser(state, user) {
		state.user = user;
	},
	setAvancement(state, avancement) {
		state.avancement = avancement;
		if (avancement.tentatives.length > 0) {
			state.tentative = {
				code:avancement.tentatives[0].code,
				langage:avancement.tentatives[0].langage
			}
		}
	},
	setTentative(state, tentative) {
		state.tentative = tentative;
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
			state.tentative = {
				code:state.question.ebauches[Object.keys(state.question.ebauches)[0]].code,
				langage:state.question.ebauches[Object.keys(state.question.ebauches)[0]].langage
			}
		}
	},
	setAfficherRetroaction(state, boolValue) {
		state.afficherRetroaction = boolValue;
	},
	setAfficherTentative(state, boolValue) {
		state.afficherTentative = boolValue;
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
	updateMsgAPIEnvoiTentative(state, msg) {
		state.msgAPIEnvoiTentative = msg;
	},
	updateEnvoieTentativeEnCours(state, bool) {
		state.envoiTentativeEnCours = bool;
	},
};
