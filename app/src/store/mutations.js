export const mutations = {
	setErreurs(state, erreurs) {
		state.erreurs = erreurs;
	},

	setUser(state, user) {
		state.user = user;
	},
	setAvancement(state, avancement) {
		state.avancement = avancement;
		if (Object.keys(avancement.sauvegardes).length > 0) {
			var datePlusRecente = 0;
			for (var key in avancement.sauvegardes) {
				if (avancement.sauvegardes[key].date_sauvegarde > datePlusRecente) {
					state.tentative = {
						code: avancement.sauvegardes[key].code,
						langage: key,
					};
					datePlusRecente = avancement.sauvegardes[key].date_sauvegarde;
				}
			}
		} else {
			if (avancement.tentatives.length > 0) {
				state.tentative = {
					code: avancement.tentatives[0].code,
					langage: avancement.tentatives[0].langage,
				};
				state.retroactionTentative = avancement.tentatives[0];
			}
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
	setUriQuestion(state, uri_question) {
		state.uri_question = uri_question;
	},
	setSauvegarde(state, sauvegarde) {
		state.sauvegardes[sauvegarde.langage] = sauvegarde;
	},
	setSauvegardes(state, sauvegardes) {
		state.sauvegardes = sauvegardes;
	},
};
