import { createStore } from "vuex";
import { mutations } from "./mutations";
import actions from "./actions";

export default createStore({
	state: {
		user: null,
		question: null,
		tentative: null,
		retroactionTentative: null,
		msgAPIEnvoiTentative: null,
		envoiTentativeEnCours: false,
		avancement: null,
		afficherRetroaction: false,
		afficherTentative: false,
	},
	actions,
	mutations,
});
