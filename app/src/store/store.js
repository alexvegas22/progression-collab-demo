import { createStore } from "vuex";
import { mutations } from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default createStore({
	state: {
		user: null,
		uri: null,
		langageDéfaut: null,
		démo: false,
		token: null,
		cb_succes: null,
		cb_succes_params: null,
		cb_auth: null,
		cb_auth_params: null,
		username: null,
		question: null,
		tentative: null,
		retroactionTentative: null,
		authentificationTentativeEnCours: false,
		envoiTentativeEnCours: false,
		mode_affichage: 0,
		avancement: null,
		sauvegardes: [],
		erreurs: null,
		configServeur: null,
		thèmeSombre: false,
		sélectionnerTestHaut: false,
		sélectionnerTestBas: false,
		réinitialiserTentativeAvecRaccourci: false,
		ongletCourant: null,
		thèmeSombreBasculéAvecRaccourci: false,
		ctrlEnter: "ctrl+enter",
		ctrlAltUp: "ctrl+alt+up",
		ctrlAltDown: "ctrl+alt+down",
		ctrlAltD: "ctrl+alt+d",
		ctrlAltR: "ctrl+alt+r",
		ctrlAltO: "ctrl+alt+o",
		ctrlAltL: "ctrl+alt+l",
		ctrlAltE: "ctrl+alt+e",
		ctrlAltQ: "ctrl+alt+q",
		ctrlAltF: "ctrl+alt+f",
		ctrlAltS: "ctrl+alt+s",
		ctrlEnterVCodeMirror: "Ctrl-Enter",
		ctrlAltUpVCodeMirror: "Ctrl-Alt-Up",
		ctrlAltDownVCodeMirror: "Ctrl-Alt-Down",
		ctrlAltDVCodeMirror: "Ctrl-Alt-D",
		ctrlAltRVCodeMirror: "Ctrl-Alt-R",
		ctrlAltOVCodeMirror: "Ctrl-Alt-O",
		ctrlAltLVCodeMirror: "Ctrl-Alt-L",
		ctrlAltEVCodeMirror: "Ctrl-Alt-E",
		ctrlAltQVCodeMirror: "Ctrl-Alt-Q",
		ctrlAltFVCodeMirror: "Ctrl-Alt-F",
		ctrlAltSVCodeMirror: "Ctrl-Alt-S",
	},
	getters,
	actions,
	mutations,
});
