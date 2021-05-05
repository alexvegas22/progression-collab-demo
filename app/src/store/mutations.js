export const mutations = {
	setUser(state, user) {
		state.user = user;
	},
	setAvancement(state, avancement) {
		state.avancement = avancement;
		if (avancement.tentatives.length > 0) {
			state.tentative = {
				code: avancement.tentatives[0].code,
				langage: avancement.tentatives[0].langage,
			};
			state.retroactionTentative = avancement.tentatives[0];
		}
	},
	setTentative(state, tentative) {
		state.tentative = tentative;
	},
	setQuestion(state, question) {
		if (!state.tentative) {
			state.tentative = {
				code: question.ebauches[Object.keys(question.ebauches)[0]].code,
				langage: question.ebauches[Object.keys(question.ebauches)[0]].langage,
			};
		}
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
};
