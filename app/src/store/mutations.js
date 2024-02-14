import jwt_decode from "jwt-decode";
import {copie_profonde} from "@/util/commun.js";

export const mutations = {
	setErreurs(state, erreurs) {
		state.erreurs = erreurs;
	},

	setUser(state, user) {
		state.user = user;
	},

	setUsername(state, username) {
		state.username = username;
		state.unleash.setContextField("userId", state.username);
	},

	setUnleash(state, unleash) {
		state.unleash = unleash;
		state.unleash.setContextField("userId", state.username);
	},

	setToken(state, token) {
		if(token?.jwt) {
			const token_décodé = jwt_decode(token.jwt);
			const ttl = token_décodé.expired - token_décodé.current;

			// Calcule l'heure d'expiration du token en fonction de l'heure du client
			// pour éviter qu'une disparité avec l'heure du serveur cause des problèmes de validation
			state.token = { token: token, timestamp: Math.round(Date.now() / 1000) + ttl };
		}
		else {
			state.token = { token: null, timestamp: null };
		}
	},
	
	setTokenRessources(state, tokenRessources) {
		state.tokenRessources = tokenRessources;
	},

	setTokenScore(state, tokenScore) {
		state.tokenScore = tokenScore;
	},

	setUri(state, uri) {
		state.uri = uri;
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
		state.testsInitiaux = question ? copie_profonde( state.question.tests ) : [];
	},
	updateCodeTentative(state, code) {
		state.tentative.code = code;
	},
	updateLangageTentative(state, langage) {
		state.tentative.langage = langage;
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
	setDifficultésRéussies(state, difficultésRéussies) {
		state.difficultésRéussies = difficultésRéussies;
	},
	setThèmeSombre(state, val) {
		state.user.préférences.thème = val ? "monokai" : "default";
	},
	setPréférences(state, val) {
		state.user.préférences = val;
	},
	setLocale(state, val) {
		state.user.préférences.locale = val;
	},
	setNbRéussitesParLangage(state, nbRéussitesParLangage) {
		state.nbRéussitesParLangage = nbRéussitesParLangage;
	},

	setModeAffichage(state, val) {
		state.mode_affichage = val;
	},
	setSélectionnerTestHaut(state, val){
		state.sélectionnerTestHaut = val;
	},
	setSélectionnerTestBas(state, val){
		state.sélectionnerTestBas = val;
	},
	setIndicateursDeFonctionnalité(state, val){
		state.indicateursDeFonctionnalité = val;
	},
	setEnChargement(state, val){
		state.enChargement = Math.max(0, state.enChargement + (val ? 1 : -1));
	},
	setConteneurEnChargement(state, val){
		state.conteneurEnChargement = Math.max(0, state.conteneurEnChargement + (val ? 1 : -1));
	},
	setEntréeTest(state, val) {
		state.question.tests[val.index].entrée = val.entrée;
	},
	setParamsTest(state, val) {
		state.question.tests[val.index].params = val.params;
	},
	setTest(state, val) {
		state.question.tests[val.index] = val.test;
	},
	setTests(state, val) {
		state.question.tests = val;
	},
	setRésultat(state, params){
		if(!state.tentative.resultats) state.tentative.resultats=new Array();
		state.tentative.resultats[params.index] = params.résultat;
	},
	setRésultats(state, val){
		if(state.tentative){
			state.tentative.resultats = val;
		}
	},
	setFeedback(state, val){
		if(state.tentative){
			state.tentative.feedback = val;
		}
	},
	setErreurCallback(state, val){
		state.erreur_callback = val;
	}
};
