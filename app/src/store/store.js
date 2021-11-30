import { createStore } from "vuex";
import { mutations } from "./mutations";
import actions from "./actions";

export default createStore({
	state: {
		user: null,
		uri: null,
		langageDéfaut: null,
		token: null,
		cb_succes: null,
		cb_succes_params: null,
		cb_auth: null,
		cb_auth_params: null,
		username: null,
		question: null,
		tentative: null,
		retroactionTentative: null,
		envoiTentativeEnCours: false,
		mode_affichage: 0,
		avancement: null,
		sauvegardes: [],
		erreurs: null,
		authentificationErreurHandler: null
	},
	actions,
	mutations,
});
