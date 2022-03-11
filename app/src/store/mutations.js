export const mutations = {
	setErreurs(state, erreurs) {
		state.erreurs = erreurs;
	},

	setUser(state, user) {
		state.user = user;
	},

	setUsername(state, username) {
		state.username = username;
	},

	setToken(state, token) {
		state.token = token;
	},

	setUri(state, uri) {
		state.uri = uri;
	},

	setModeÉdition(state, edit) {
		state.mode_édition = edit;
	},

	setDémo(state, val) {
		state.démo = val;
	},

	setLangageDéfaut(state, langageDéfaut) {
		state.langageDéfaut = langageDéfaut;
	},

	setCallbackSucces(state, cb_succes) {
		state.cb_succes = cb_succes;
	},

	setCallbackSuccesParams(state, cb_succes_params) {
		state.cb_succes_params = cb_succes_params;
	},

	setCallbackAuth(state, cb_auth) {
		state.cb_auth = cb_auth;
	},

	setCallbackAuthParams(state, cb_auth_params) {
		state.cb_auth_params = cb_auth_params;
	},

	setConfigServeur(state, config) {
		state.configServeur = config;
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
	updateCodeEbauche(state, code) {
		state.question.ebauches[state.tentative.langage].code = code;
	},
	updateEnvoieTentativeEnCours(state, bool) {
		state.envoiTentativeEnCours = bool;
	},
	updateAuthentificationEnCours(state, bool) {
		state.authentificationEnCours = bool;
	},
	setSauvegarde(state, sauvegarde) {
		state.sauvegardes[sauvegarde.langage] = sauvegarde;
	},
	setSauvegardes(state, sauvegardes) {
		state.sauvegardes = sauvegardes;
	},
	setModeCréation(state, modeCréation) {
		state.modeCréation = modeCréation;
	},
	setThèmeSombre(state, val) {
		state.thèmeSombre = val;
	},
};
