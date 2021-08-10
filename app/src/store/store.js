import { createStore } from "vuex";
import { mutations } from "./mutations";
import actions from "./actions";

export default createStore({
	state: {
		user: null,
		token: null,
		username: null,
		question: null,
		tentative: null,
		retroactionTentative: null,
		msgAPIEnvoiTentative: null,
		envoiTentativeEnCours: false,
		mode_affichage: 0,
		avancement: null,
		sauvegardes: [],
		erreurs: null,
	},
	actions,
	mutations,
});
