import { createStore } from "vuex";
import { mutations } from "./mutations";
import actions from "./actions";

export default createStore({
	state: {
		user: {},
		question: {},
		tentative: {},
		retroactionTentative: Object,
		msgAPIEnvoiTentative: null,
		envoiTentativeEnCours: false,
		avancement: {},
		afficherRetroaction: false,
		afficherTentative: false,
	},
	actions,
	mutations,
});
